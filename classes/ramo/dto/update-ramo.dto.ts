import { CreateRamoDto } from './create-ramo.dto';

export class UpdateRamoDto extends CreateRamoDto {
  id: number;

  constructor(id: number, nome: string, descricao: string) {
    super(nome, descricao);
    this.id = id;
  }
}
