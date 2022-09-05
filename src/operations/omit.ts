import { IOption } from '../interfaces/specification'

export class Omit {
    filter({ single, complex, array }: IOption, data: any): {[key: string]: any} {
        let processData = {}

        if(single) processData = {...processData, ...this.single(single, data) }

        if(complex) processData = {...processData, ...this.complex(complex, data) }

        if(array) processData = {...processData, ...this.array(array, data) }

        return processData
    }

    private single(singleProps: string[], data: any): {[key: string]: any} {

        const omittedSingleProps: {[key: string]: any} = {}

        const filterProps = Object.keys(data).filter(prop => !singleProps.includes(prop))

        filterProps.forEach(prop => omittedSingleProps[prop] = data[prop])

        return omittedSingleProps
    }

    private complex(complex: {[key: string]: string[]}, data: any): {[key: string]: any} {

        let omitedComplexProps: {[key: string]: any} = {}

        const propsToOmit = Object.keys(complex)

        // Map properties in complex option.
        propsToOmit.forEach(prop => omitedComplexProps[prop] = data[prop])

        // Delete sub properties to omit.
        propsToOmit.forEach(prop => complex[prop].forEach(subProp => this.deleteSubProp(prop, subProp, omitedComplexProps)))
        
        return omitedComplexProps
    }

    private array(arrays: {[key: string]: string[]}, data: any): {[key: string]: any[]} {

        let result: {[key: string]: any[]} = {}

        for (const arrayName in arrays) {

            const propsToOmit = arrays[arrayName]

            result[arrayName] = this.mapDynamic(data[arrayName], propsToOmit)

        }
        return result
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

    private deleteSubProp(prop: string, subProp: string, omitedComplexProps: any): void {

        delete omitedComplexProps[prop][subProp]
        
    }
}