import {
  EmpresaCreateData,
  EmpresaObject,
  EmpresaSearchCriteria,
  EmpresaUpdateData,
} from '../types';

// Interface do serviço de empresas
export interface IEmpresaService {
  create(dados: EmpresaCreateData): Promise<void>;
  update(id: number, dados: EmpresaUpdateData): Promise<void>;
  search(criteria: EmpresaSearchCriteria): Promise<EmpresaObject[]>;
  delete(id: number): Promise<void>;
}
