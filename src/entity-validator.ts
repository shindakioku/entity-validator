import { Table, Options, Validator, ErrorHandler, Indice } from './types'
import { keyParameter, head } from './utils';
import { propertyDecorator, methodDecorator } from './decorators';

export * from './types'

export const setDecorator =
  <T, E, F>(table: Table, validator: Validator<T, E>, errorHandler: ErrorHandler<T, F>, options: Options) =>
    (target: any, key: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value
      const indices = target[keyParameter(key)] as Indice[]
      const indice = head(indices)

      descriptor.value = async function (...args: any[]) {
        const fieldName: string = indice.customName || options.field
        const value: T = args[indice.index][fieldName]

        if (!(await validator(table, options.field, value))) {
          return errorHandler(table, value, options.error, options.code)
        }

        return originalMethod.apply(this, args)
      }
    }

export { propertyDecorator, methodDecorator }