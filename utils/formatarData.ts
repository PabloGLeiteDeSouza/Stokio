const formatarData = (data: string) => {
    const date = new Date(data);
    const dia = (date.getDate() + 1).toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const ano = date.getFullYear().toString().padStart(4, '0');
    return `${dia+'/'+mes+'/'+ano}`;
}

export default formatarData;