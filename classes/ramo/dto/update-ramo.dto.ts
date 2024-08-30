import { CreateRamoDto } from './create-ramo.dto';

export class UpdateRamoDto extends CreateRamoDto {
  constructor(id: number, nome: string, descricao: string) {
    super(nome, descricao, id);
  }
}
