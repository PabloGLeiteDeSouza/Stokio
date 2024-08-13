import { TipoDeProduto } from '$classes/tipo_produto';
import { UpdateTipoDeProdutoDto } from '$classes/tipo_produto/dto/update-tipo-de-produto.dto';
import { SQLiteDatabase } from 'expo-sqlite';
import React from 'react';
import { AlertStatic } from 'react-native';

export default async function Start(
  db: SQLiteDatabase,
  setTipo: React.Dispatch<React.SetStateAction<Array<UpdateTipoDeProdutoDto>>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  Alert: AlertStatic,
) {
  try {
    const tipo = await new TipoDeProduto(db).findAll();
    setTipo(tipo);
    setIsLoading(false);
  } catch (error) {
    Alert.alert((error as Error).message);
    throw error;
  }
}
