import { Pick } from './operations/pick'
import { Omit } from './operations/omit'
import { ISpecification } from './interfaces/specification'
import { Rename } from './operations/rename'

export class Mapper {

  private pick: Pick

  private omit: Omit

  private rename: Rename
  
  private entityProps: Array<string> = []

  constructor() {

    this.pick = new Pick()

    this.omit = new Omit()

    this.rename = new Rename()
  }

    public mapToCreate<t> (entity: t, data: any, specification?: ISpecification): { [key: string]: any } {

      this.setEntityProps(entity)

      this.ensureThatNotHasPickAndOmit(specification)

      let filteredData = this.filterEntityProps(data)

      if(specification?.pick) filteredData = this.pick.filter(specification.pick, filteredData)

      if(specification?.omit) filteredData = this.omit.filter(specification.omit, filteredData)

      if(specification?.rename) filteredData = this.rename.map(specification.rename, filteredData)

      return filteredData
    }

    private setEntityProps (entity: any): void {

      this.entityProps = Object.keys(entity)

    }

    private belongsEntity (prop: any): boolean {

      return this.entityProps.includes(prop)

    }
    
    private filterEntityProps (data: any): {[key: string]: any} {

      const propsBelongEntity = Object.keys(data).filter(prop => this.belongsEntity(prop))

      const entityFiltered = propsBelongEntity.reduce((acc: {[key: string]: any}, prop: string) =>{

        acc[prop] = data[prop]

        return acc

      },{})

      return entityFiltered
    }

    private ensureThatNotHasPickAndOmit (specification?: ISpecification): void | never {

      if (specification?.omit && specification?.pick) throw new Error('Options parameter must have pick or omit but no both')

    }
    
  }
