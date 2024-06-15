import { CreateEnderecoDto } from "./create-endereco.dto";

export class UpdateEnderecoDto extends CreateEnderecoDto {
    constructor(id: number, rua: string, numero: number, cep: string, complemento: string, bairro: string, cidade: string, UF: string) {
        super(rua, numero, cep, complemento, bairro, cidade, UF, id)
    }
}