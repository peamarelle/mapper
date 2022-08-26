interface IOption {
    pick?: string[],
    omit?: string[],
    rename?: { [key: string]: string }
}

export class Mapper {
    private entityProps: Array<string> = []
    private propertiesWithSubPropsToPick: Map<string, Array<string>> = new Map()
    private propertiesWithSubPropsToOmit: Map<string, Array<string>> = new Map()

    public mapToCreate<t>(entity: t, data: any, opts?: IOption): { [key: string]: any } {
        this.setEntityProps(entity)
        this.isUniqueOption(opts)
        opts?.omit && this.setPropertiesWithSubPropsToOmit(opts.omit) || opts?.pick && this.setPropertiesWithSubPropsToPick(opts.pick)
        const filteredProps = (opts?.omit || opts?.pick) ? this.pickOrOmitProps(data, opts) : this.filterProps(data)
        const mappedResult = opts?.rename ? this.mapRenaming(filteredProps, data, opts.rename) : this.map(filteredProps, data)
        return mappedResult
    }

    private  setEntityProps(entity: any): void {
        this.entityProps = this.getProps(entity)
    }

    private  isEntityProp(prop: any): boolean {
        return this.entityProps.includes(prop)
    }

    private  getProps(data: any): Array<string> {
        return Object.keys(data)
    }

    private  filterProps(data: any): Array<string> {
        return this.getProps(data).filter(prop => this.isEntityProp(prop))
    }

    private  pickOrOmitProps(data: any, ops: IOption): Array<string> {
        return ops.pick ? this.pickProps(data, ops.pick!) : this.omitProps(data, ops.omit!)
    }

    private  pickProps(data: any, pick: Array<string>): Array<string> {
        return this.getProps(data).filter(prop => (pick.includes(prop) || this.propertiesWithSubPropsToPick.has(prop)) && this.isEntityProp(prop))
    }

    private  setPropertiesWithSubPropsToOmit(omit: Array<string>): void {
        omit.forEach((prop: string) => {
            if (prop.includes('.')) {
                const [property, subProperty] = prop.split('.')
                !this.propertiesWithSubPropsToOmit.has(property) && this.propertiesWithSubPropsToOmit.set(property, [])
                this.propertiesWithSubPropsToOmit.get(property)!.push(subProperty)
            }
        })
    }

    private  setPropertiesWithSubPropsToPick(pick: Array<string>): void {
        pick.forEach((prop: string) => {
            if (prop.includes('.')) {
                const [property, subProperty] = prop.split('.')
                !this.propertiesWithSubPropsToPick.has(property) && this.propertiesWithSubPropsToPick.set(property, [])
                this.propertiesWithSubPropsToPick.get(property)!.push(subProperty)
            }
        })
    }

    private  omitProps(data: any, omit: Array<string>): Array<string> {
        return this.getProps(data).filter(prop => !omit.includes(prop) && this.isEntityProp(prop))
    }

    private  isUniqueOption(opts?: IOption): void | never {
        if (opts?.omit && opts?.pick) throw new Error('Options parameter must have pick or omit but no both')
    }

    private  map(filteredProps: Array<string>, data: any): { [key: string]: any } {
        let mappedResult: { [key: string]: any } = {}

        const subPropPicked = (this.propertiesWithSubPropsToPick.size > 0 && this.pickSubProps(filteredProps, data)) || {}
        this.propertiesWithSubPropsToOmit.size > 0 && this.omitSubProps(filteredProps, data)
        
        filteredProps.forEach(prop => mappedResult[prop] = data[prop])

        return { ...mappedResult, ...subPropPicked}
    }

    private  mapRenaming(filteredProps: Array<string>, data: any, propsToRename: any): { [key: string]: any } {
        const mappedResult: { [key: string]: any } = {}
        filteredProps.forEach((prop: string) => {
            this.getProps(propsToRename).includes(prop) ? mappedResult[propsToRename[prop]] = data[prop] : mappedResult[prop] = data[prop]
        })

        const subPropPicked = (this.propertiesWithSubPropsToPick.size > 0 && this.pickSubProps(filteredProps, data)) ||{}
        Object.keys(subPropPicked).forEach(key => {
            if(this.propertiesWithSubPropsToPick.has(key)) {
                subPropPicked[propsToRename[key]] = subPropPicked[key]
                delete mappedResult[key]
                delete subPropPicked[key]
            }
        })
        
        this.propertiesWithSubPropsToOmit.size > 0 && this.omitSubProps(filteredProps, data)

        return {...mappedResult, ...subPropPicked}
    }

    private  pickSubProps(filteredProps: Array<string>, data: any): { [key: string]: any } {
        const mappedResult: { [key: string]: any } = {}

        filteredProps.forEach(prop => {
            if(this.propertiesWithSubPropsToPick.has(prop)) mappedResult[prop] = {}
            this.propertiesWithSubPropsToPick.get(prop)?.
            forEach(subProp => {
                mappedResult[prop][subProp] = data[prop][subProp]
            })
        })

        return mappedResult
    }

    private  omitSubProps(filteredProps: Array<string>, data: any): { [key: string]: any } {
        const mappedResult: { [key: string]: any } = {}
        
        filteredProps.forEach(prop => {
            const subPropsToOmit = this.propertiesWithSubPropsToOmit.get(prop)
            subPropsToOmit?.forEach(subProp => {
                delete data[prop][subProp]
            })
        })
        return mappedResult
    }
}
