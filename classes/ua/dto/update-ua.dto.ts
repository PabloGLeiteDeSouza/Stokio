import { CreateUnidadeDeArmazenamentoDto } from "./create-ua.dto";

export class UpdateUnidadeDeArmazenamentoDto extends CreateUnidadeDeArmazenamentoDto {

    constructor(id: number, nome: string, descricao: string, id_tipo_unidade_de_armazenamento: number){
        super(nome, descricao, id_tipo_unidade_de_armazenamento, id);
    }
}