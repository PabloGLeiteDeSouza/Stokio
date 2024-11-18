import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    codigo_de_barras: Yup.string().required('O código de barras é obrigatório'),
    nome: Yup.string().required('O nome é obrigatório'),
    descricao: Yup.string().required('A descrição é obrigatória'),
    valor: Yup.number().required('O valor é obrigatório'),
    data_de_validade: Yup.date().required('A data de válidade é obrigatória'),
    tipo_produto: Yup.object().shape({
      id: Yup.number().required('O tipo de produto é obrigatório'),
      nome: Yup.string().required('O nome é obrigatório'),
    }),
    marca: Yup.object().shape({
      id: Yup.number().required('A marca é obrigatória'),
      nome: Yup.string().required('O nome é obrigatório'),
    }),
    quantidade: Yup.number().required('A quantidade é obrigatória'),
    unidade_de_medida: Yup.object().shape({
      id: Yup.number().required('A unidade de medida é obrigatória'),
      nome: Yup.string().required('O nome é obrigatório'),
      valor: Yup.string().required('O valor é obrigatório'),
    }),
    tamanho: Yup.number().required('O tamanho é obrigatório'),
    unidade_de_armazenamento: Yup.object().shape({
      id: Yup.number().required('A unidade de armazenamento é obrigatório'),
      nome: Yup.string().required('O nome é obrigatório'),
    }),
});