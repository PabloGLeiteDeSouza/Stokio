import { CreateEnderecoDto } from "./create-endereco.dto";

export class UpdateEnderecoDto extends CreateEnderecoDto {
    constructor(id: number, logradouro: string, numero: number, cep: string, complemento: string, bairro: string, cidade: string, UF: string) {
        super(logradouro, numero, cep, complemento, bairro, cidade, UF, id)
    }
}