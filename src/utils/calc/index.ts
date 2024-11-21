export function somarValor(valor1: number, valor2: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor1 + valor2);
}

export function subtrairValor(valor1: number, valor2: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor1 - valor2);
}

export function formatValue(valor: string | number) {
  return Number((new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(valor))).replace(',', '.'));
}


export function sumAllValues(values: Array<number>) {
  let sum = 0;
  values.forEach((value) => {
    sum += value
  });
  return sum;
}