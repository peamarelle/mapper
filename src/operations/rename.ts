/* eslint-disable no-return-assign */
import { IRenameOptions, ISpecification } from '../interfaces/specification'

export class Rename {
    private processData: any = {}
    private renamedProps: string[] = []

    public map (data: any, specification?: ISpecification): {[key: string]: any} {
      if (!specification?.rename) return {}

      return this.complex(data, specification.rename)
        .single(data, specification.rename)
        .getRestOfProps(data)
        .getProcessData
    }

    private get getProcessData () {
      return this.processData
    }

    private single (data: any, options?: IRenameOptions): this {
      if (!options?.single) return this

      const propsToRename = options.single

      Object.keys(propsToRename)
        .forEach((key: string) => {
          this.renameProp(propsToRename, key, data)
          this.renamedProps.push(key)
        })

      return this
    }

    private complex (data: any, options?: IRenameOptions): this {
      if (!options?.complex) return this

      const objectsToRename = options.complex

      Object.keys(objectsToRename)
        .forEach(prop => {
          this.renameSubProps(prop, objectsToRename[prop], data[prop])
          this.saveRenamedProps(prop)
        })

      return this
    }

    private renameProp (propsToRename: any, key: string, data: any): void {
      const newKeyName = propsToRename[key]
      this.processData[newKeyName] = data[key]
    }

    private renameSubProps (prop: string, renameSubKeys: any, subProps: any): void {
      this.processData[prop] = {}

      Object.keys(subProps)
        .forEach((subKey) => {
          this.processData[prop][renameSubKeys[subKey] || subKey] = subProps[subKey]
        })
    }

    private saveRenamedProps (propName: string): void {
      this.renamedProps.push(propName)
    }

    private isNotRenamed (key: string): boolean {
      return !this.renamedProps.includes(key)
    }

    private getRestOfProps (data: any): this {
      Object.keys(data)
        .filter((key: string) => this.isNotRenamed(key))
        .forEach((prop: string) => this.processData[prop] = data[prop])

      return this
    }
}
