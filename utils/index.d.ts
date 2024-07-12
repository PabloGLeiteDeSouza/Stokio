declare module "utils" {
    export const formatDateString: (data: Date) => string
    export const formatStringDate: (data: string) => string
    export function verificarAtributosObjeto(obj: any): boolean
    export function verificarArray(obj: Array<any>): boolean
}