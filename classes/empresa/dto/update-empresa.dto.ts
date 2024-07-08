import { CreateEmpresaDto } from "./create-empresa.dto";

export class UpdateEmpresaDto extends CreateEmpresaDto {
    constructor(id: number, id_endereco: number){
        super(id_endereco, id);
    }
}
