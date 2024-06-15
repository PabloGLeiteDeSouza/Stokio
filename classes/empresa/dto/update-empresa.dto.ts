import { CreateEmpresaDto } from "./create-empresa.dto";

export class UpdateEmpresaDto extends CreateEmpresaDto {
    
    constructor(id: number, id_pessoa: number, ramo: string) {
        super(ramo, id_pessoa, id)
    }
}