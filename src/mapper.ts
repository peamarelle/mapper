interface IOption {
    pick?: string[],
    omit?: string[],
    rename?: { [key: string]: string }
}

export class Mapper {
    private static entityProps: Array<string> = []
    private static propertiesWithSubProps: { [key: string]: Array<string>}  = {}

    public static mapToCreate<t>(entity: t, data: any, opts?: IOption): {[key: string]: any} {
        this.setEntityProps(entity)
        this.isUniqueOption(opts)
        const filteredProps = (opts?.omit || opts?.pick ) ? this.pickOrOmitProps(data, opts) : this.filterProps(data)
        const mappedResult = opts?.rename ? this.mapRenaming(filteredProps, data, opts.rename) : this.map(filteredProps, data, opts)
        return mappedResult
    }

    private static setEntityProps(entity: any): void {
        this.entityProps =  this.getProps(entity)
    }

    private static isEntityProp (prop: any): boolean {
        return this.entityProps.includes(prop)
    }

    private static getProps(data: any): Array<string> {
        return Object.keys(data)
    }

    private static filterProps(data: any): Array<string> {
        return this.getProps(data).filter(prop => this.isEntityProp(prop))
    }

    private static pickOrOmitProps(data: any, ops: IOption): Array<string> {
        return ops.pick ? this.pickProps(data, ops.pick!) : this.omitProps(data, ops.omit!)
    }
    
    private static pickProps(data: any, pick: Array<string>): Array<string> {
        this.propertiesWithSubProps = this.setPropertiesWithSubProps(pick)
        return this.getProps(data).filter(prop => ( pick.includes(prop) || this.getProps(this.propertiesWithSubProps).includes(prop) ) && this.isEntityProp(prop))
    }

    private static setPropertiesWithSubProps(option: string[]) {
        const propertiesWithSubProp: { [key: string]: Array<string>}  = {}
        option.forEach((prop: string) => {
            if (prop.includes('.')) {
                const [propToPick, subPropToPick] = prop.split('.')
                propertiesWithSubProp[propToPick] = []
                propertiesWithSubProp[propToPick].push(subPropToPick)

            }
        })
        return propertiesWithSubProp
    }

    private static omitProps(data: any, omit: Array<string>): Array<string> {
        return this.getProps(data).filter(prop => !omit.includes(prop) && this.isEntityProp(prop))
    }

    private static isUniqueOption(opts?: IOption): void | never {
        if(opts?.omit && opts?.pick) throw new Error('Options parameter must have pick or omit but no both')
    }

    private static map(filteredProps: Array<string>, data: any, opts?: IOption): {[key: string]: any} {
        const mappedResult: {[key: string]: any} = {}
        filteredProps.forEach(prop => mappedResult[prop] = data[prop])
        const propsThatHasSubProps = filteredProps.filter(prop => this.getProps(this.propertiesWithSubProps).includes(prop))
        propsThatHasSubProps.forEach(prop => this.propertiesWithSubProps[prop].forEach(subProp => {
            mappedResult[prop] = {}
            mappedResult[prop][subProp] = data[prop][subProp]
        }))
        return mappedResult
    }

    private static mapRenaming(filteredProps: Array<string>, data: any, propsToRename: any): {[key: string]: any}  {
        const mappedResult: {[key: string]: any} = {}
        filteredProps.forEach((prop: string) => {
            this.getProps(propsToRename).includes(prop) ? mappedResult[propsToRename[prop]] = data[prop] : mappedResult[prop] = data[prop]
        })
        return mappedResult
    }
}
