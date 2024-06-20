import { CreateTipoDeUnidadeDeArmazenamento } from "./create-tipo-de-unidade-de-armazenamento.dto";

export class UpdateTipoDeUnidadeDeArmazenamentoDto extends CreateTipoDeUnidadeDeArmazenamento {

    constructor(id: number, nome: string){
        super(nome, id);
    }
}