export interface IOption {
    single?: string[],
    complex?: {[key: string]: string[]},
    array?: {[key: string]: string[]}
}

export interface IRenameOptions {
    single?: {[key: string]: string},
    complex?: {[key: string]: any}
}

export interface ISpecification {
    pick?: IOption,
    omit?: IOption,
    rename?: IRenameOptions
}
