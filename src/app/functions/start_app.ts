import { Alert } from 'react-native';
import * as LocalAutentication from 'expo-local-authentication';

export default async function StartApp(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setPageStarting: React.Dispatch<
    React.SetStateAction<'auth-screen' | 'app-screens'>
  >,
) {
  try {
    const res = await LocalAutentication.authenticateAsync({
      promptMessage: 'Acesse o seu dispositivo',
    });
    if (!res.success) {
      throw new Error('Nao foi possivel se autenticar!');
    }
    setPageStarting('app-screens');
    setIsLoading(false);
  } catch (error) {
    Alert.alert('Erro', (error as Error).message);
    setPageStarting('auth-screen');
    setIsLoading(false);
    throw error;
  }
}
