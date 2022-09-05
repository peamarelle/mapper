export interface ISpecification {
    pick?: IOption,
    omit?: IOption,
    rename?: IRenameOptions
}

export interface IOption { 
    single?: string[], 
    complex?: {[key: string]: string[]}, 
    array?: {[key: string]: string[]}
}

export interface IRenameOptions { 
    single?: any[], 
    complex?: {[key: string]: any[]}
}