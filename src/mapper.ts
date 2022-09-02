import { Pick } from './operations/pick'

interface IOption {
    pick?: { single?: string[], complex?: {[key: string]: string[]}, array?: {[key: string]: string[]}},
    omit?: string[],
    rename?: { [key: string]: string }
}

export class Mapper {
  private pick: Pick
  private entityProps: Array<string> = []
  private _data: any

  constructor() {
    this.pick = new Pick()
  }

    public mapToCreate<t> (entity: t, data: any, opts?: IOption): { [key: string]: any } {
      this.setEntityProps(entity)
      this.setData(data)
      this.ensureThatNotHasPickAndOmit(opts)
      return (opts?.omit || opts?.pick) ? this.pickOrOmitProps(opts) : this.filterEntityProps(data)
    }

    private setEntityProps (entity: any): void {
      this.entityProps = Object.keys(entity)
    }

    private setData (data: any) {
      this._data = data
    }

    private belongsEntity (prop: any): boolean {
      return this.entityProps.includes(prop)
    }

    private filterEntityProps (data: any): {[key: string]: any} {
      const entityFiltered: {[key: string]: any} = {}
      for (const prop in data) {
        if (this.belongsEntity(prop)) {
          entityFiltered[prop] = data[prop]
        }
      }
      return entityFiltered
    }

    private pickOrOmitProps (ops: IOption): {[key: string]: any} {
      let buildData = {}
      buildData =  ops.pick ? this.pick.build(ops.pick, this._data) : {}
      return buildData
    }

    private ensureThatNotHasPickAndOmit (opts?: IOption): void | never {
      if (opts?.omit && opts?.pick) throw new Error('Options parameter must have pick or omit but no both')
    }

}
