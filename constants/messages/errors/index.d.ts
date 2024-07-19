import type { TypeDatabaseErrors, TypeDBErros } from './types'

declare namespace MessageErrors {
    export const DBErros: TypeDBErros;
    export const database_errors: TypeDatabaseErrors;
}