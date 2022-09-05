export class Pick {

    filter({ single, complex, array }: { single?: string[], complex?: {[key: string]: string[]}, array?: {[key: string]: string[]}}, data: any): {[key: string]: any} {
        let processData = {}

        if(single) processData = {...processData, ...this.single(single, data) }

        if(complex) processData = {...processData, ...this.complex(complex, data) }

        if(array) processData = {...processData, ...this.array(array, data) }

        return processData
    }

    private single(singleProps: string[], data: any): {[key: string]: any} {
        const pickedSingleProps: {[key: string]: any} = {}
        singleProps.forEach(prop => pickedSingleProps[prop] = data[prop])
        return pickedSingleProps
    }

    private complex(complex: {[key: string]: string[]}, data: any): {[key: string]: any} {
        const pickedComplexProps: {[key: string]: any} = {}
        const complexPropsToPick = Object.keys(complex)
        complexPropsToPick.forEach(prop => {
            pickedComplexProps[prop] = {}
            complex[prop].forEach(subProp => {
                pickedComplexProps[prop][subProp] = data[prop][subProp]
            })
        })
        return pickedComplexProps
    }

    private array(arrays: {[key: string]: string[]}, data: any): {[key: string]: any[]} {
        let result: {[key: string]: any[]} = {}
        for (const arrayName in arrays) {
            const propsToPick = arrays[arrayName]
            result[arrayName] = this.mapDynamic(arrayName, propsToPick, data)
        }
        return result
    }

    private mapDynamic(arrayName: string, propsToPick: string[], data: any): {[key: string]: any}[] {
        return data[arrayName].map((obj: {[key: string]: any}) => {
            return propsToPick.reduce((accum: {[key: string]: any}, prop: string)=> {
            accum[prop] = obj[prop]
            return accum
         }, {})
        })
    }
}