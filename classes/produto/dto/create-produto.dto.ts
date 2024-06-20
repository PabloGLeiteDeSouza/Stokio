export class CreateProdutoDto {
  id?: number;
  codigo_de_barras: string;
  nome: string;
  descricao: string;
  tipo: string;
  id_categoria: number;
  id_marca: number;
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
    id_categoria: number,
    id_marca: number,
    tamanho: string,
    quantidade: number,
    preco: number,
    id_empresa: number,
    id?: number,
    data_de_validade?: Date,
  ) {
    this.nome = nome;
    this.codigo_de_barras = codigo_de_barras;
    this.descricao = descricao;
    this.tipo = tipo;
    this.id_categoria = id_categoria;
    this.id_marca = id_marca;
    this.tamanho = tamanho;
    this.quantidade = quantidade;
    this.preco = preco;
    this.id_empresa = id_empresa;
    this.id = id;
    this.data_de_validade = data_de_validade;
  }
}
