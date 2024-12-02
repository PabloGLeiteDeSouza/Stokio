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
  search(tipo: "cpf" | "cnpj" | "nome_pessoa" | "nome_fantasia" | "razao_social", value: string): Promise<EmpresaObject[]>
  delete(id: number): Promise<void>;
}
