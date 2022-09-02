export class Pick {

    build({ single, complex, array }: { single?: string[], complex?: {[key: string]: string[]}, array?: {[key: string]: string[]}}, data: any): {[key: string]: any} {
        let buildData = {}

        if(single) {
            buildData = {...buildData, ...this.single(single, data) }
        }

        if(complex) {
            buildData = {...buildData, ...this.complex(complex, data) }
        }

        if(array) {
            buildData = {...buildData, ...this.array(array, data) }
        }

        return buildData
    }

    private single(singleProps: string[], data: any): {[key: string]: any} {
        const pickedSingleProps: {[key: string]: any} = {}
        for (const prop in data) {
            if (singleProps.includes(prop)) {
                pickedSingleProps[prop] = data[prop]
            }
        }
        return pickedSingleProps
    }

    private complex(complex: {[key: string]: string[]}, data: any): {[key: string]: any} {
        const pickedComplexProps: {[key: string]: any} = {}
        for (const prop in data) {
            if (complex[prop]) {
                pickedComplexProps[prop] = {}
                complex[prop].forEach(subProp => {
                    pickedComplexProps[prop][subProp] = data[prop][subProp]
                })
            }
        }
        return pickedComplexProps
    }

    private array(arrays: {[key: string]: string[]}, data: any): {[key: string]: any[]} {
        let result: {[key: string]: any[]} = {}
        for (const arrayName in arrays) {
            result[arrayName] = this.mapDynamic(arrayName, arrays[arrayName], data)
        }
        return result
    }

    private mapDynamic(arrayName: string, propsToPick: string[], data: any): {[key: string]: any}[] {
        return data[arrayName].map((obj: {[key: string]: any}) => propsToPick.reduce((accum: {[key: string]: any}, prop: string)=> {
            accum[prop] = obj[prop]
            return accum
        }, {}))
    }
}