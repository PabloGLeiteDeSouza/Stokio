import { MaskType, TelefoneType } from './types';
export function mask(
  value: string,
  type: MaskType,
  telefoneType?: TelefoneType,
): string {
  switch (type) {
    case 'telefone':
      return maskTelefone(value, telefoneType);
    case 'cpf':
      return maskCpf(value);
    case 'cnpj':
      return maskCnpj(value);
    case 'cep':
      return maskCep(value);
    case 'data':
      return maskData(value);
    default:
      return value;
  }
}

export function unmask(value: string, type?: 'date'): string {
  if (type && type === 'date') {
    const day = value.split('/')[0];
    const month = value.split('/')[1];
    const year = value.split('/')[2];
    return `${year}-${month}-${day}`;
  }
  return value.replace(/[^\d]/g, '');
}

function maskTelefone(
  value: string,
  telefoneType: TelefoneType = 'movel',
): string {
  const onlyNumbers = unmask(value).slice(2);
  const ddd = onlyNumbers.slice(0, 2);
  const part1 =
    telefoneType === 'fixo' ? onlyNumbers.slice(2, 6) : onlyNumbers.slice(2, 7);
  const part2 = onlyNumbers.slice(
    telefoneType === 'fixo' ? 6 : 7,
    telefoneType === 'fixo' ? 6 + 4 : 7 + 4,
  );
  return `+55 (${ddd}) ${part1}-${part2}`;
}

function maskCpf(value: string): string {
  const onlyNumbers = unmask(value);
  const part1 = onlyNumbers.slice(0, 3);
  const part2 = onlyNumbers.slice(3, 6);
  const part3 = onlyNumbers.slice(6, 9);
  const part4 = onlyNumbers.slice(9, 11);
  return `${part1}.${part2}.${part3}-${part4}`;
}

function maskCnpj(value: string): string {
  const onlyNumbers = unmask(value);
  const part1 = onlyNumbers.slice(0, 2);
  const part2 = onlyNumbers.slice(2, 5);
  const part3 = onlyNumbers.slice(5, 8);
  const part4 = onlyNumbers.slice(8, 12);
  const part5 = onlyNumbers.slice(12, 14);
  return `${part1}.${part2}.${part3}/${part4}-${part5}`;
}

function maskCep(value: string): string {
  const onlyNumbers = unmask(value);
  const part1 = onlyNumbers.slice(0, 5);
  const part2 = onlyNumbers.slice(5, 8);
  return `${part1}-${part2}`;
}

function maskData(value: string): string {
  const onlyNumbers = unmask(value);
  const day = onlyNumbers.slice(0, 2);
  const month = onlyNumbers.slice(2, 4);
  const year = onlyNumbers.slice(4, 8);
  return `${day}/${month}/${year}`;
}
