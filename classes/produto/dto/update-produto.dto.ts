import { CreateProdutoDto } from './create-produto.dto';

export class UpdateProdutoDto extends CreateProdutoDto {

  constructor(
    id: number,
    nome: string,
    codigo_de_barras: string,
    descricao: string,
    tipo: string,
    categoria: string,
    subcategoria: string,
    tamanho: string,
    quantidade: number,
    preco: number,
    id_empresa: number,
    data_de_validade: Date,
  ) {
    super(nome,
    codigo_de_barras,
    descricao,
    tipo,
    categoria,
    subcategoria,
    tamanho,
    quantidade,
    preco,
    id_empresa,
    id,
    data_de_validade)
  }
}
