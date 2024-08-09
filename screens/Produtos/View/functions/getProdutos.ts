import { Produto } from '$classes/produto';
import { UpdateProdutoDto } from '$classes/produto/dto/update-produto.dto';
import { SQLiteDatabase } from 'expo-sqlite';

const getProdutos = async (
  type:
    | 'all'
    | 'nome'
    | 'codigo_de_barras'
    | 'categoria'
    | 'marca'
    | 'tipo'
    | 'empresa',
  setProdutcts: React.Dispatch<React.SetStateAction<Array<UpdateProdutoDto>>>,
  db: SQLiteDatabase,
  paramSearch: string,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  switch (type) {
    case 'all':
      const produtos = await new Produto(db).findAll();
      setProdutcts(produtos);
      break;
    case 'codigo_de_barras':
      const produto = await new Produto(db).findFirstByBarCode(paramSearch);
      setProdutcts([produto]);
      break;
    case 'categoria':
      const produtosCategoria = await new Produto(db).findAllByCategory(
        Number(paramSearch),
      );
      setProdutcts(produtosCategoria);
      break;
    case 'empresa':
      const produtosEmpresa = await new Produto(db).findAllByIdEmpresa(
        Number(paramSearch),
      );
      setProdutcts(produtosEmpresa);
      break;
    case 'marca':
      const produtosMarca = await new Produto(db).findFirstByIdMarca(
        Number(paramSearch),
      );
      setProdutcts(produtosMarca);
      break;
    case 'tipo':
      const produtosTipo = await new Produto(db).findAllByTipo(paramSearch);
      setProdutcts(produtosTipo);
      break;
    case 'nome':
      const produtosNome = await new Produto(db).findFirstByName(paramSearch);
      setProdutcts([produtosNome]);
      break;
  }
  if (isLoading) {
    setIsLoading(false);
  }
};

export default getProdutos;
