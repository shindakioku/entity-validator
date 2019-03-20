import { PropertyField, Validator, ErrorHandler, Table, Options } from './types';
import { keyParameter } from './utils';
import { setDecorator } from './entity-validator';

export const propertyDecorator = (customName?: PropertyField) =>
  (target: any, key: string, index: number) => {
    const metaData = { customName, index }
    const metaDataKey = keyParameter(key)

    if (Array.isArray(target[metaDataKey])) {
      target[metaDataKey].push(metaData)
    } else {
      target[metaDataKey] = [metaData]
    }
  }

export const methodDecorator =
  <T, E, F>(validator: Validator<T, E>, errorHandler: ErrorHandler<T, F>) =>
    (table: Table, options: Options) =>
      setDecorator<T, E, F>(table, validator, errorHandler, options)