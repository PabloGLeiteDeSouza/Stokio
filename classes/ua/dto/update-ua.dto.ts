import { CreateUaDto } from "./create-ua.dto";

export class UpdateUaDto extends CreateUaDto {

    constructor(id: number, nome: string, descricao: string, tipo: string){
        super(nome, descricao, tipo, id);
    }
}