export class CreateProdutoDto {
  codigo_de_barras: string;
  nome: string;
  descricao: string;
  tipo: string;
  categoria: string;
  subcategoria: string;
  tamanho: string;
  quantidade: number;
  preco: number;
  id_empresa: number;
  data_de_validade?: Date;

  constructor(
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
    data_de_validade?: Date,
  ) {
    this.nome = nome;
    this.codigo_de_barras = codigo_de_barras;
    this.descricao = descricao;
    this.tipo = tipo;
    this.categoria = categoria;
    this.subcategoria = subcategoria;
    this.tamanho = tamanho;
    this.quantidade = quantidade;
    this.preco = preco;
    this.id_empresa = id_empresa;
    if (data_de_validade) {
      this.data_de_validade = data_de_validade;
    }
  }
}
