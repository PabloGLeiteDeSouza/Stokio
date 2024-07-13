import { CreateProdutoDto } from './create-produto.dto';

export class UpdateProdutoDto extends CreateProdutoDto {
  constructor(
    id: number,
    nome: string,
    codigo_de_barras: string,
    descricao: string,
    tipo: string,
    id_categoria: number,
    id_marca: number,
    tamanho: string,
    quantidade: number,
    preco: number,
    id_empresa: number,
    data_de_validade: Date,
  ) {
    super(
      nome,
      codigo_de_barras,
      descricao,
      tipo,
      id_categoria,
      id_marca,
      tamanho,
      quantidade,
      preco,
      id_empresa,
      id,
      data_de_validade,
    );
  }
}
