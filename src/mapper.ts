interface IOption {
    pick?: string[],
    omit?: string[],
    rename?: { [key: string]: string }
}

export class Mapper {
    private entityProps: Array<string> = []
    private _data: any
    private subpropsbyproperty: Map<string, Array<string>> = new Map()

    public mapToCreate<t>(entity: t, data: any, opts?: IOption): { [key: string]: any } {
        this.setEntityProps(entity)
        this.setData(data)
        this.ensureThatNotHasPickAndOmit(opts)
        opts?.omit && this.setPropertiesWithSubProps(opts.omit) || opts?.pick && this.setPropertiesWithSubProps(opts.pick)
        const filteredProps = (opts?.omit || opts?.pick) ? this.pickOrOmitProps(opts) : this.filterEntityProps(data)
        const mappedResult = opts?.rename ? this.mapRename(filteredProps, opts.rename, opts) : this.map(filteredProps, opts)
        return mappedResult
    }

    private  setEntityProps(entity: any): void {
        this.entityProps = Object.keys(entity)
    }

    private setData (data: any) {
        this._data = data
    }

    private  belongsEntity(prop: any): boolean {
        return this.entityProps.includes(prop)
    }


    private  filterEntityProps(data: any): Array<string> {
        return Object.keys(data).filter(prop => this.belongsEntity(prop))
    }

    private  pickOrOmitProps(ops: IOption): Array<string> {
        return ops.pick ? this.pickProps(ops.pick!) : this.omitProps(ops.omit!)
    }

    private  pickProps(pick: Array<string>): Array<string> {
        return Object.keys(this._data).filter(prop => (pick.includes(prop) || this.subpropsbyproperty.has(prop)) && this.belongsEntity(prop))

    }
    
    private  omitProps(omit: Array<string>): Array<string> {
        return Object.keys(this._data).filter(prop => !omit.includes(prop) && this.belongsEntity(prop))
    }

    private  ensureThatNotHasPickAndOmit(opts?: IOption): void | never {
        if (opts?.omit && opts?.pick) throw new Error('Options parameter must have pick or omit but no both')
    }

    private  setPropertiesWithSubProps(opt: Array<string>): void {
        opt.filter(prop => prop.includes('.')).forEach((prop: string) => {
            const [property, subProperty] = prop.split('.')
            !this.subpropsbyproperty.has(property) && this.subpropsbyproperty.set(property, [])
            this.subpropsbyproperty.get(property)!.push(subProperty)
            
        })
    }

    private  pickSubProps(): { [key: string]: any } {
        const mappedResult: { [key: string]: any } = {}

        this.subpropsbyproperty.forEach((subProps, prop) => {
            mappedResult[prop] = {}
            subProps.forEach(subProp => mappedResult[prop][subProp] = this._data[prop][subProp])
        })
        return mappedResult
    }

    private  omitSubProps(): { [key: string]: any } {
        const mappedResult: { [key: string]: any } = {}
        
        this.subpropsbyproperty.forEach((subProps, prop) => {
            mappedResult[prop] = {}
            Object.keys(this._data[prop]).filter(subProp => !subProps.includes(subProp)).
            forEach(subProp => mappedResult[prop][subProp] = this._data[prop][subProp])
        })
        return mappedResult
    }

    private  map(filteredProps: Array<string>, opts?: IOption): { [key: string]: any } {
        const mappedResult: { [key: string]: any } = {}

        const cleanedData = opts?.pick ? this.pickSubProps() : opts?.omit ? this.omitSubProps() : {}
        
        filteredProps.forEach(prop => mappedResult[prop] = this._data[prop])

        return { ...mappedResult, ...cleanedData }
    }

    private  mapRename(filteredProps: Array<string>, propsToRename: any, opts: IOption): { [key: string]: any } {
        const renamedProps = this.renamePropsWithOutSubProps(propsToRename)

        const propsToOnlyMap = filteredProps.filter(prop => !Object.keys(propsToRename).includes(prop))

        const mappedData = this.map(propsToOnlyMap, opts)
        
        const renamedPropsWithSubProps = this.renamePropsWithSubProps(mappedData, propsToRename)

        return {...renamedProps, ...renamedPropsWithSubProps}
    }

    private renamePropsWithSubProps(props: any, propsToRename: any): any {
        Object.keys(propsToRename).filter(propToRename => this.subpropsbyproperty.has(propToRename)).
        forEach(prop => {
            props[propsToRename[prop]] = props[prop]
            delete props[prop]
        })
        return props
    }

    private renamePropsWithOutSubProps(propsToRename: any) {
        const renamedProps: { [key: string]: any } = {}
        Object.keys(propsToRename).filter(prop => !this.subpropsbyproperty.has(prop))
        .forEach((prop: string) => renamedProps[propsToRename[prop]] = this._data[prop])
        return renamedProps
    }

}
