export type Create<T1, T2> = (data: T1) => Promise<T2>
export type GetById<T> = (id: number) => Promise<T | null>
export type BaseFilter = { filter: string; value: any }
export type GetAll<T> = (filter?: BaseFilter[]) => Promise<T[]>
export type UpdateById<T1, T2> = (id: number, data: T1) => Promise<T2>
export type DeleteById = (id: number) => Promise<string>

export type GenericObject = {
    [key: string]: any
}

export type ResponseError = {
    message: string
    field?: string
}

export type ResponseApi<T> = {
    errors?: ResponseError[]
    message: string
    data?: T
}
