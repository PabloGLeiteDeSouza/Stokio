import { RamoCreateData, RamoUpdateData, RamoObject } from '../types';

export interface IRamoService {
  create(data: RamoCreateData): Promise<number>;
  update(data: RamoUpdateData): Promise<void>;
  findById(id: number): Promise<RamoObject | null>;
  findAll(): Promise<RamoObject[]>;
  delete(id: number): Promise<void>;
  findByName(nome: string): Promise<Array<RamoObject>>;
}

export interface IRamoCriteria {
  nome?: string; // Nome do ramo para buscas parciais
  id?: number; // ID específico do ramo
}
