import { Categoria } from '$classes/categoria';
import { Empresa } from '$classes/empresa';
import { Marca } from '$classes/marca';
import { Produto } from '$classes/produto';
import { UpdateProdutoDto } from '$classes/produto/dto/update-produto.dto';
import { TipoDeProduto } from '$classes/tipo_produto';
import { UnidadeDeArmazenamento } from '$classes/ua';
import { Um } from '$classes/um';
import { SQLiteDatabase } from 'expo-sqlite';
import { AlertStatic } from 'react-native';

async function start(
  setProdutcts: React.Dispatch<React.SetStateAction<Array<UpdateProdutoDto>>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setHaveAllDeps: React.Dispatch<
    React.SetStateAction<{
      empresa: boolean;
      categoria: boolean;
      marca: boolean;
      tipo: boolean;
      um: boolean;
      ua: boolean;
    }>
  >,
  db: SQLiteDatabase,
  haveAllDeps: {
    empresa: boolean;
    categoria: boolean;
    marca: boolean;
    tipo: boolean;
    um: boolean;
    ua: boolean;
  },
  Alert: AlertStatic,
) {
  try {
    setIsLoading(true);
    const empresa = await new Empresa(db).findAll();
    if (!empresa || empresa.length < 1) {
      setIsLoading(false);
      return;
    }
    setHaveAllDeps({
      ...haveAllDeps,
      empresa: true,
    });
    console.log('Empresas: ', empresa);
    const categoria = await new Categoria(db).findAll();
    if (!categoria || categoria.length < 1) {
      setIsLoading(false);
      return;
    }
    setHaveAllDeps({
      ...haveAllDeps,
      categoria: true,
    });
    console.log('Categorias: ', categoria);
    const marca = await new Marca(db).findAll();
    if (!marca || marca.length < 1) {
      setIsLoading(false);
      return;
    }
    setHaveAllDeps({
      ...haveAllDeps,
      marca: true,
    });
    console.log('Marcas: ', marca);
    const tipo = await new TipoDeProduto(db).findAll();
    if (!tipo || tipo.length < 1) {
      setIsLoading(false);
      return;
    }
    setHaveAllDeps({
      ...haveAllDeps,
      tipo: true,
    });
    const um = await new Um(db).findAll();
    if (!um || um.length < 1) {
      setIsLoading(false);
      return;
    }
    setHaveAllDeps({
      ...haveAllDeps,
      um: true,
    });
    console.log('Unidades de medida: ', um);
    const ua = await new UnidadeDeArmazenamento(db).findAll();
    if (!ua || ua.length < 1) {
      setIsLoading(false);
      return;
    }
    setHaveAllDeps({
      ...haveAllDeps,
      ua: true,
    });
    console.log('Unidades de: ', categoria);
    const produto = await new Produto(db).findAll();
    if (!produto || produto.length < 1) {
      setIsLoading(false);
      return;
    }
    setProdutcts(produto);
    setIsLoading(false);
  } catch (error) {
    Alert.alert('Erro', (error as Error).message);
    throw error;
  }
}

export default start;
