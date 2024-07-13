import type { TypeDatabaseErrors, TypeDBErros } from './types'

declare module "messages-error" {
    export const DBErros: TypeDBErros;
    export const database_errors: TypeDatabaseErrors;
}