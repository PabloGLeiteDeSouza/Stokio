import { TipoDeProduto } from '$classes/tipo_produto';
import { SQLiteDatabase } from 'expo-sqlite';
import { FormikHelpers } from 'formik';
import { AlertStatic } from 'react-native';
import { CadastrarProdutosScreenNavigationProp } from '../types';

type Values = {
  nome: string;
  descricao: string;
};

export async function criarTipo(
  values: Values,
  formikHelpers: FormikHelpers<Values>,
  db: SQLiteDatabase,
  navigation: CadastrarProdutosScreenNavigationProp,
  Alert: AlertStatic,
): Promise<void> {
  try {
    const tipo = await new TipoDeProduto(db).create(values);
    if (!tipo) {
      throw new Error('Não foi possível cadastrar o tipo!');
    }
    navigation?.navigate('listar-tipo-produto');
  } catch (error) {
    Alert.alert('Erro', (error as Error).message);
  }
}