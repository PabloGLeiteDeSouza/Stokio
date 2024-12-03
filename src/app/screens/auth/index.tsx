import { Box, Button, ButtonText, Heading, Image, Text } from '@gluestack-ui/themed';
import * as LocalAutentication from 'expo-local-authentication';
import { RootStackParamList } from '$types/param-list';
import { Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
type AuthScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'auth-screen'
>;
interface AuthScreenProps {
  navigation?: AuthScreenNavigationProp;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const StartAuthentication = async () => {
    try {
      const result = await LocalAutentication.authenticateAsync({
        promptMessage: 'Scan your fingerprint to unlock',
      });
      if (result.success) {
        console.log('Authentication successful');
        Alert.alert('Voce esta autenticado no aplicativo!');
        navigation?.navigate('app-screens');
      } else {
        throw new Error('Nao foi possivel se autenticar tente novamente!');
      }
    } catch (error) {
      Alert.alert('Erro ao autenticar', (error as Error).message);
      throw error;
    }
  };

  return (
    <Box w="$full" alignItems="center">
      <Box px="$8" mt="$5" gap="$5">
        <Image source="icon" w="$5" h="$5" />
        <Box>
          <Heading textAlign="center" size="2xl">
            Ola! boas vindas ao STOKIO
          </Heading>
        </Box>
        <Box gap="$5">
          <Text size="lg">
            Para acessar ao sistema por favor pressione o botao acessar abaixo:
          </Text>
          <Text size="lg">
            Para acessar os vídeos mesmas informações que você utiliza para
            acessar o seu celular
          </Text>
          <Text size="lg">
            Caso não tenha nenhuma forma de bloqueio do celular recomendamos que
            faça a inclusão de uma forma de bloqueio caso contrário não poderá
            utilizar o aplicativo.
          </Text>
        </Box>
        <Box my="$5">
          <Button onPress={() => StartAuthentication()}>
            <ButtonText>Autenticar</ButtonText>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthScreen;
