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
        this.entityProps = Object.keys(entity)
    }

    private  isEntityProp(prop: any): boolean {
        return this.entityProps.includes(prop)
    }


    private  filterProps(data: any): Array<string> {
        return Object.keys(data).filter(prop => this.isEntityProp(prop))
    }

    private  pickOrOmitProps(data: any, ops: IOption): Array<string> {
        return ops.pick ? this.pickProps(data, ops.pick!) : this.omitProps(data, ops.omit!)
    }

    private  pickProps(data: any, pick: Array<string>): Array<string> {
        return Object.keys(data).filter(prop => (pick.includes(prop) || this.propertiesWithSubPropsToPick.has(prop)) && this.isEntityProp(prop))
    }

    private  setPropertiesWithSubPropsToOmit(omit: Array<string>): void {
        omit.filter(prop => prop.includes('.')).forEach((prop: string) => {    
            const [property, subProperty] = prop.split('.')
            !this.propertiesWithSubPropsToOmit.has(property) && this.propertiesWithSubPropsToOmit.set(property, [])
            this.propertiesWithSubPropsToOmit.get(property)!.push(subProperty)
            
        })
    }

    private  setPropertiesWithSubPropsToPick(pick: Array<string>): void {
        pick.filter(prop => prop.includes('.')).forEach((prop: string) => {
            const [property, subProperty] = prop.split('.')
            !this.propertiesWithSubPropsToPick.has(property) && this.propertiesWithSubPropsToPick.set(property, [])
            this.propertiesWithSubPropsToPick.get(property)!.push(subProperty)
        })
    }

    private  omitProps(data: any, omit: Array<string>): Array<string> {
        return Object.keys(data).filter(prop => !omit.includes(prop) && this.isEntityProp(prop))
    }

    private  isUniqueOption(opts?: IOption): void | never {
        if (opts?.omit && opts?.pick) throw new Error('Options parameter must have pick or omit but no both')
    }

    private  map(filteredProps: Array<string>, data: any): { [key: string]: any } {
        const mappedResult: { [key: string]: any } = {}

        const subPropPicked = this.pickSubProps(data)
        const subPropOmitted = this.omitSubProps(data)
        
        filteredProps.forEach(prop => mappedResult[prop] = data[prop])

        return { ...mappedResult, ...subPropPicked, ...subPropOmitted}
    }

    private  mapRenaming(filteredProps: Array<string>, data: any, propsToRename: any): { [key: string]: any } {
        let mappedResult: { [key: string]: any } = {}
        
        let subPropPicked = this.pickSubProps(data)

        let subPropOmitted = this.omitSubProps(data)

        mappedResult = this.renamePropsWithOutSubProps(propsToRename, data)

        subPropPicked = this.renamePropsWithSubProps(subPropPicked, propsToRename)

        subPropOmitted = this.renamePropsWithSubProps(subPropOmitted, propsToRename)

        filteredProps.filter(prop => !Object.keys(propsToRename).includes(prop)).forEach((prop: string) => mappedResult[prop] = data[prop])

        return { ...mappedResult, ...subPropPicked, ...subPropOmitted }
    }

    private  pickSubProps(data: any): { [key: string]: any } {
        const mappedResult: { [key: string]: any } = {}

        this.propertiesWithSubPropsToPick.forEach((subProps, prop) => {
            mappedResult[prop] = {}
            subProps.forEach(subProp => mappedResult[prop][subProp] = data[prop][subProp])
        })
        return mappedResult
    }

    private  omitSubProps(data: any): { [key: string]: any } {
        const mappedResult: { [key: string]: any } = {}
        
        this.propertiesWithSubPropsToOmit.forEach((subProps, prop) => {
            mappedResult[prop] = {}
            Object.keys(data[prop]).filter(subProp => !subProps.includes(subProp)).
            forEach(subProp => mappedResult[prop][subProp] = data[prop][subProp])
        })
        return mappedResult
    }

    private renamePropsWithSubProps(filteredSubProps: any, propsToRename: any): any {
        Object.keys(filteredSubProps).filter(prop => Object.keys(propsToRename).includes(prop)).
        forEach(prop => {
            filteredSubProps[propsToRename[prop]] = filteredSubProps[prop]
            delete filteredSubProps[prop]
        })
        return filteredSubProps
    }

    private renamePropsWithOutSubProps(propsToRename: any, data: any) {
        const mappedResult: { [key: string]: any } = {}
        Object.keys(propsToRename).filter(prop => !this.propertiesWithSubPropsToOmit.has(prop) && !this.propertiesWithSubPropsToPick.has(prop))
        .forEach((prop: string) => mappedResult[propsToRename[prop]] = data[prop])
        return mappedResult
    }
}
