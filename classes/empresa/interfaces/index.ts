import {
  EmpresaCreateData,
  EmpresaObject,
  EmpresaSearchCriteria,
  EmpresaUpdateData,
  RamoObject,
} from '../types';

// Interface do serviço de empresas
export interface IEmpresaService {
  create(dados: EmpresaCreateData): Promise<void>;
  update(id: number, dados: EmpresaUpdateData): Promise<void>;
  search(criteria: EmpresaSearchCriteria): Promise<EmpresaObject[]>;
  delete(id: number): Promise<void>;
  getAllRamos(): Promise<RamoObject[]>;
  createRamo(nome: string): Promise<number>;
  updateRamo(id: number, nome: string): Promise<void>;
  deleteRamo(id: number): Promise<void>;
}
