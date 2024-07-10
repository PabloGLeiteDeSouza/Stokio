export const formatStringDate = (data: string) => {
    const date = new Date(data);
    const dia = (date.getDate() + 1).toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const ano = date.getFullYear().toString().padStart(4, '0');
    return `${dia+'/'+mes+'/'+ano}`;
}

export const formatDateString = (data: Date) => {
    const dia = (data.getDate() + 1).toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear().toString().padStart(4, '0');
    return `${dia}/${mes}/${ano}`;
}

export default { formatDateString, formatStringDate }
