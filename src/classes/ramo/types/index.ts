export interface RamoCreateData {
  nome: string;
  descricao?: string;
}

export interface RamoUpdateData {
  nome: string;
  descricao?: string;
}

export interface RamoObject {
  id: number;
  nome: string;
  descricao: string | null;
}
