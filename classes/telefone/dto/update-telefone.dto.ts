import { CreateTelefoneDto } from "./create-telefone.dto";

export class UpdateTelefoneDto extends CreateTelefoneDto {
    constructor(id: number, telefone: string) {
        super(telefone,id)
    }
}