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
        this.isUniqueOption(opts)
        opts?.omit && this.setPropertiesWithSubProps(opts.omit)
        opts?.pick && this.setPropertiesWithSubProps(opts.pick)
        const filteredProps = (opts?.omit || opts?.pick) ? this.pickOrOmitProps(opts) : this.filterProps(data)
        const mappedResult = opts?.rename ? this.mapRename(filteredProps, opts.rename, opts) : this.map(filteredProps, opts)
        return mappedResult
    }

    private  setEntityProps(entity: any): void {
        this.entityProps = Object.keys(entity)
    }

    private  isEntityProp(prop: any): boolean {
        return this.entityProps.includes(prop)
    }


    private  filterProps(data: any): Array<string> {
        return Object.keys(data).filter(prop => this.isEntityProp(prop))
    }

    private  pickOrOmitProps(ops: IOption): Array<string> {
        return ops.pick ? this.pickProps(ops.pick!) : this.omitProps(ops.omit!)
    }

    private  pickProps(pick: Array<string>): Array<string> {
        return Object.keys(this._data).filter(prop => (pick.includes(prop) || this.subpropsbyproperty.has(prop)) && this.isEntityProp(prop))
    }

    private  setPropertiesWithSubProps(opt: Array<string>): void {
        opt.filter(prop => prop.includes('.')).forEach((prop: string) => {
            const [property, subProperty] = prop.split('.')
            !this.subpropsbyproperty.has(property) && this.subpropsbyproperty.set(property, [])
            this.subpropsbyproperty.get(property)!.push(subProperty)
            
        })
    }

    private  omitProps(omit: Array<string>): Array<string> {
        return Object.keys(this._data).filter(prop => !omit.includes(prop) && this.isEntityProp(prop))
    }

    private  isUniqueOption(opts?: IOption): void | never {
        if (opts?.omit && opts?.pick) throw new Error('Options parameter must have pick or omit but no both')
    }

    private  map(filteredProps: Array<string>, opts?: IOption): { [key: string]: any } {
        const mappedResult: { [key: string]: any } = {}

        const cleanedProps = opts?.pick ? this.pickSubProps() : opts?.omit ? this.omitSubProps() : {}
        
        filteredProps.forEach(prop => mappedResult[prop] = this._data[prop])

        return { ...mappedResult, ...cleanedProps }
    }

    private  mapRename(filteredProps: Array<string>, propsToRename: any, opts?: IOption): { [key: string]: any } {
        const mappedResult = this.renamePropsWithOutSubProps(propsToRename)
        const cleanedProps = this.map(filteredProps.filter(prop => !Object.keys(propsToRename).includes(prop)), opts)
        const renamedPropsWithSubProps = this.renamePropsWithSubProps(cleanedProps, propsToRename)

        return {...mappedResult, ...renamedPropsWithSubProps}
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

    private renamePropsWithSubProps(filteredSubProps: any, propsToRename: any): any {
        Object.keys(propsToRename).filter(propToRename => this.subpropsbyproperty.has(propToRename)).
        forEach(prop => {
            filteredSubProps[propsToRename[prop]] = filteredSubProps[prop]
            delete filteredSubProps[prop]
        })
        return filteredSubProps
    }

    private renamePropsWithOutSubProps(propsToRename: any) {
        const mappedResult: { [key: string]: any } = {}
        Object.keys(propsToRename).filter(prop => !this.subpropsbyproperty.has(prop))
        .forEach((prop: string) => mappedResult[propsToRename[prop]] = this._data[prop])
        return mappedResult
    }

    private setData (data: any) {
        this._data = data
    }
}
