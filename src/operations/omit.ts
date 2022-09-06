import { IOption } from '../interfaces/specification'

export class Omit {
    private processData: any = {}
    private options: IOption = {}
    private data: {[key:string]: any} = {}

    public filter(options: IOption, data: any): {[key:string]: any} {
        this.options = options
        this.data = data
        return this.single()
        .complex()
        .array()
        .getProcessData
    }

    private get getProcessData() {
        return this.processData
    }

    private single(): this {
        if(!this.options.single) return this

        const single = this.options.single

        const filterProps = Object.keys(this.data).filter(prop => !single.includes(prop))

        filterProps.forEach(prop => this.processData[prop] = this.data[prop])

        return this
    }

    private complex(): this {
        if(!this.options.complex) return this

        const complex = this.options.complex

        const propsToOmit = Object.keys(complex)

        propsToOmit.forEach(prop => this.processData[prop] = this.data[prop])

        propsToOmit.forEach(prop => complex[prop].forEach((subProp: string) => this.deleteSubProp(prop, subProp)))

        return this
    }

    private array(): this {
        if(!this.options.array) return this

        const arrays = this.options.array

        for (const arrayName in arrays) {

            const propsToOmit = arrays[arrayName]
    
            this.processData[arrayName] = this.mapDynamic(this.data[arrayName], propsToOmit)
    
        }

        return this
    }

    private mapDynamic(data: any, propsToOmit: string[]): {[key: string]: any}[] {

        return data.map((obj: {[key: string]: any}) => {

            const dataFiltered: {[key: string]: any[]} = {}

            for(const prop in obj) {

                if(!propsToOmit.includes(prop)) { dataFiltered[prop] = obj[prop]}

            }

            return dataFiltered
        })
    }

    private deleteSubProp(prop: string, subProp: string): void {
        delete this.processData[prop][subProp]
    }
}