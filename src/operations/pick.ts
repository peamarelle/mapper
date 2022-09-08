import { IOption, ISpecification } from '../interfaces/specification'

export class Pick {
    private processData: any = {}
    private options: IOption = {}
    private data: any = {}

    public map (data: any, specification?: ISpecification): {[key: string]: any} {
      if (!specification?.pick) return {}

      this.options = specification.pick
      this.data = data

      return this.single()
        .complex()
        .array()
        .getProcessData
    }

    private get getProcessData () {
      return this.processData
    }

    private single (): this {
      if (!this.options.single) return this

      const propsToPick: string[] = this.options.single

      propsToPick.forEach(prop => { this.processData[prop] = this.data[prop] })

      return this
    }

    private complex (): this {
      if (!this.options.complex) return this

      const mapKeys: {[key: string]: any} = {}

      const propsToPick = this.options.complex

      const keysToMap: string[] = Object.keys(propsToPick)

      keysToMap.forEach((prop: string) => {
        mapKeys[prop] = {}

        propsToPick[prop].forEach((subProp: string) => {
          mapKeys[prop][subProp] = this.data[prop][subProp]
        })
      })

      this.processData = { ...this.processData, ...mapKeys }

      return this
    }

    private array (): this {
      if (!this.options.array) return this

      const mappedArrays: {[key: string]: any[]} = {}

      const arraysToMap = this.options.array

      for (const arrayName in arraysToMap) {
        const propsToPick = arraysToMap[arrayName]

        mappedArrays[arrayName] = this.mapAttributes(this.data[arrayName], propsToPick)
      }

      this.processData = { ...this.processData, ...mappedArrays }

      return this
    }

    private mapAttributes (multipleData: any[], propsToPick: string[]): any[] {
      return multipleData.map((object: any) => {
        return propsToPick.reduce((accum: any, prop: string) => {
          accum[prop] = object[prop]
          return accum
        }, {})
      })
    }
}
