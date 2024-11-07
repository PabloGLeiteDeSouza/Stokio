import * as Yup from 'yup';

class Validator {
    private static isCPF(cpf: string): boolean {
      cpf = cpf.replace(/[^\d]+/g, '');
      if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  
      let sum = 0;
      for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
      let remainder = 11 - (sum % 11);
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cpf.charAt(9))) return false;
  
      sum = 0;
      for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
      remainder = 11 - (sum % 11);
      if (remainder === 10 || remainder === 11) remainder = 0;
      return remainder === parseInt(cpf.charAt(10));
    }
  
    private static isCNPJ(cnpj: string): boolean {
      cnpj = cnpj.replace(/[^\d]+/g, '');
      if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
  
      let length = cnpj.length - 2;
      let numbers = cnpj.substring(0, length);
      let digits = cnpj.substring(length);
      let sum = 0;
      let pos = length - 7;
  
      for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
      }
      let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (result !== parseInt(digits.charAt(0))) return false;
  
      length = length + 1;
      numbers = cnpj.substring(0, length);
      sum = 0;
      pos = length - 7;
      for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
      }
      result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      return result === parseInt(digits.charAt(1));
    }
  
    public static validateCPF(document: string): boolean {
      return this.isCPF(document);
    }
  
    public static validateCNPJ(document: string): boolean {
      return this.isCNPJ(document);
  
    }
}


export const validationSchema = Yup.object().shape({
    pessoa: Yup.object().shape({
      id: Yup.string(),
      nome: Yup.string().when('pessoa.id', (id_pessoa, schema) =>
        id_pessoa ? schema.required('Nome é obrigatório') : schema,
      ),
      data_nascimento: Yup.date().when('pessoa.id', {
        is: (id_pessoa: string) => id_pessoa !== '',
        then: (yup) => yup.required('Data de nascimento e obrigatorio'),
      }),
      cpf: Yup.string().when('pessoa.id', (id_pessoa, schema) =>
        id_pessoa ? schema.required('CPF é obrigatório').test('cpf', 'CPF esta invalido', async (value) => {
          return Validator.validateCPF(value);
        }) : schema,
      ),
    }),
    cep: Yup.string().required('CEP é obrigatório'),
    logradouro: Yup.string().required('Logradouro é obrigatório'),
    numero: Yup.string().required('Número é obrigatório'),
    complemento: Yup.string(),
    bairro: Yup.string().required('Bairro é obrigatório'),
    cidade: Yup.string().required('Cidade é obrigatória'),
    uf: Yup.string().required('UF é obrigatório'),
    telefones: Yup.array()
      .of(
        Yup.object().shape({
          numero: Yup.string()
            .required('Número de telefone é obrigatório')
            .min(12, 'Número de telefone deve ter no mínimo 12 caracteres'),
        }),
      )
      .min(1, 'É necessário informar ao menos um telefone'), // Adiciona uma validação para garantir ao menos um telefone
  
    emails: Yup.array()
      .of(
        Yup.object().shape({
          endereco: Yup.string()
            .required('Endereço de email é obrigatório')
            .email('Endereço de email inválido'),
        }),
      )
      .min(1, 'É necessário informar ao menos um email'),
    saldo: Yup.string().required('Saldo é obrigatório'),
});