export const formatStringDate = (data: string) => {
  const date = new Date(data);
  const dia = (date.getDate() + 1).toString().padStart(2, '0');
  const mes = (date.getMonth() + 1).toString().padStart(2, '0');
  const ano = date.getFullYear().toString().padStart(4, '0');
  return `${dia + '/' + mes + '/' + ano}`;
};
export function verificarAtributosObjeto(obj: object) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        return false;
      }
    }
  }
  return true;
}

export function verificarArray(array: Array<unknown>) {
  // Verifica se o array está vazio
  if (array.length === 0) {
    return false;
  }

  // Verifica se algum valor no array é vazio, nulo ou indefinido
  for (let i = 0; i < array.length; i++) {
    if (array[i] === null || array[i] === undefined || array[i] === '') {
      return false;
    }
  }

  return true;
}

export const formatDateString = (data: Date) => {
  const date = new Date(data)
  const dia = (data.getDate() + 1).toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear().toString().padStart(4, '0');
  return `${dia}/${mes}/${ano}`;
};

export const formatDateStringDB = (data: Date) => {
  const dia = (data.getDate() + 1).toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear().toString().padStart(4, '0');
  return `${ano}-${mes}-${dia}`;
};

export const formatStringDateDB = (data: string) => {
  const date = new Date(data);
  const dia = (date.getDate() + 1).toString().padStart(2, '0');
  const mes = (date.getMonth() + 1).toString().padStart(2, '0');
  const ano = date.getFullYear().toString().padStart(4, '0');
  return `${ano + '-' + mes + '-' + dia}`;
};

export default {
  formatDateString,
  formatStringDate,
  verificarAtributosObjeto,
  verificarArray,
  formatStringDateDB,
  formatDateStringDB,
};
