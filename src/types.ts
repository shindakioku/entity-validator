export type Table = any
export type ResponseError = string
export type Code = string | number
export type Field = string | object
export type PropertyField = string

export type ErrorHandler<T, E> = (table: Table, value: T, error: ResponseError, code: Code) => E;
export type Validator<T, E = Promise<boolean> | boolean> = (table: Table, field: Field, value: T) => E;

export interface Options {
  field: Field
  error: ResponseError
  code: Code
}