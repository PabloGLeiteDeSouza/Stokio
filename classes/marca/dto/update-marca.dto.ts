import { CreateMarcaDto } from "./create-marca.dto";

export class UpdateMarcaDto extends CreateMarcaDto {
    constructor(id: number, nome: string){
        super(nome, id);
    }
}