import validateCPF from './validators/cpf';
import validateCNPJ from './validators/cnpj';

export default class Validator {
  public static isCPF(cpf: unknown): boolean {
    return validateCPF(cpf);
  }

  public static isCNPJ(cnpj: unknown): boolean {
    return validateCNPJ(cnpj);
  }
}
