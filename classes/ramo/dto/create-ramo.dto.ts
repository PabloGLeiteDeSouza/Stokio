export class CreateRamoDto {
  id?: number;
  nome: string;
  descricao?: string;

  constructor(nome: string, descricao?: string, id?: number) {
    this.nome = nome;
    this.descricao = descricao;
    this.id = id;
  }
}
