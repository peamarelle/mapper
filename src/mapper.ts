import { Pick } from './operations/pick'
import { Omit } from './operations/omit'
import { ISpecification } from './interfaces/specification'
import { Rename } from './operations/rename'

export class Mapper {
  private pick: Pick = new Pick()
  private omit: Omit = new Omit()
  private rename: Rename = new Rename()
  private mapKeys: { [key: string]: any } = {}

  public mapToCreate<t> (entity: t, data: any, specification?: ISpecification): { [key: string]: any } {
    return this.getPropsFromEntity(data, entity)
      .pickPorps(specification)
      .omitPorps(specification)
      .renameProps(specification)
      .getMapKeys
  }

  private get getMapKeys (): { [key: string]: any } {
    return this.mapKeys
  }

  private belongsEntity (prop: any, entity: any): boolean {
    return Object.keys(entity).includes(prop)
  }

  private getPropsFromEntity (data: any, entity: any): this {
    Object.keys(data)
      .filter(prop => this.belongsEntity(prop, entity))
      .forEach(prop => { this.mapKeys[prop] = data[prop] })

    return this
  }

  private pickPorps (specification?: ISpecification): this {
    if (!specification?.pick) return this

    this.mapKeys = this.pick.map(this.mapKeys, specification)

    return this
  }

  private omitPorps (specification?: ISpecification): this {
    if (!specification?.omit) return this

    this.mapKeys = this.omit.map(this.mapKeys, specification)

    return this
  }

  private renameProps (specification?: ISpecification): this {
    if (!specification?.rename) return this

    this.mapKeys = this.rename.map(this.mapKeys, specification)

    return this
  }
}
