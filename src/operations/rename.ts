import { IRenameOptions } from "../interfaces/specification"

export class Rename {
    //{ single: [{name: 'nombre'}, {idReward: id}], complex: { category: [{ subcategory: 'sub categoria'}, {name: 'nombre'}]} }
    private renamedProps: string[] = []

    public map(options: IRenameOptions, data: any): {[key: string]: any} {

        let renamedProps: {[key: string]: any} = {}

        if(options.complex) renamedProps = {...renamedProps, ...this.complex(options.complex, data) }

        if(options.single) renamedProps = {...renamedProps, ...this.single(options.single, data) }

        const restOfSimpleProps = this.getRestOfProps(data)

        return { ...renamedProps, ...restOfSimpleProps }
    }

    private single(propsToRename: any[], data: any): {[key:string]: any} {
        
        const result: {[key:string]: string} = {}

        propsToRename.forEach((propToRename: {[key:string]: string}) => {

            const [oldName, newName]: string[] = Object.entries(propToRename).flat()

            result[newName] = data[oldName]

            this.saveRenamedProps(oldName)
        })
        return result
    }

    private complex(propsToRename: any, data: any): {[key:string]: any} {

        const result: {[key:string]:any} = {}

        const propNames = Object.keys(propsToRename)

        propNames.forEach(prop => {

            result[prop] = this.renameSubProps(propsToRename[prop], data[prop])

            const subProps = Object.keys(data[prop])

            const subPropsRenamed = propsToRename[prop].map((propRenamed: any) => Object.keys(propRenamed)[0])

            const restOfSubProps = subProps.filter(subProp => !subPropsRenamed.includes(subProp))

            result[prop] = this.addRestOfSubProps(restOfSubProps, result[prop], data[prop])

            this.saveRenamedProps(prop)
        })
        return result
    }

    private saveRenamedProps(propName: string): void {
        this.renamedProps.push(propName)
    }

    // Return props that have'nt renamed.
    private getRestOfProps(data: any):  {[key: string]:any} {

        const restOfProps = Object.keys(data).filter((prop: string) => !this.renamedProps.includes(prop))

        return restOfProps.reduce((acc: {[key: string]:any}, prop: string)=>{

            acc[prop] = data[prop]

            return acc

        }, {})
    }

    private renameSubProps(subPropsToRename: any[], data: any): {[key:string]: any} {

        return subPropsToRename.reduce((acc: {[key:string]: any}, subProp: {[key:string]: string})=> {

            const [ subPropToRename ] = Object.keys(subProp)

            acc[subProp[subPropToRename]] = data[subPropToRename]

            return acc

        }, {})
    }

    private addRestOfSubProps(subPropsNotRenamed: string[], renamedProperty: any, data: any): {[key: string]: any} {

        subPropsNotRenamed.forEach(subProp => renamedProperty = {...renamedProperty, [subProp]: data[subProp]})

        return renamedProperty
    }
}