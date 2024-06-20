import { CreateTelefoneDto } from "./create-telefone.dto";

export class UpdateTelefoneDto extends CreateTelefoneDto {
    constructor(id: number, telefone: string, id_empresa: number) {
        super(telefone, id_empresa, id)
    }
}