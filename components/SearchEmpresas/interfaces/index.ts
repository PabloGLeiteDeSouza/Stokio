export interface ISearchEmpresas {
  onChangeValue: (text: string) => void | Promise<void>;
  tipo:
    | 'nome_completo'
    | 'nome_fantasia'
    | 'razao_social'
    | 'cpf'
    | 'cnpj'
    | string;
  value: string;
}
