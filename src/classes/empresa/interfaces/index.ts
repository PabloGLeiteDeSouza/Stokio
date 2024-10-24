import {
  EmpresaCreate,
  EmpresaObject,
  EmpresaSearchCriteria,
  EmpresaUpdate,
} from '../types';

// Interface do serviço de empresas
export interface IEmpresaService {
  create(dados: EmpresaCreate): Promise<void>;
  update(dados: EmpresaUpdate): Promise<void>;
  search(criteria: EmpresaSearchCriteria): Promise<EmpresaObject[]>;
  delete(id: number): Promise<void>;
}
