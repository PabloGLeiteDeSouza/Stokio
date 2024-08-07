import { RootStackParamList } from '$types/index';
import { Box, Button, ButtonText, Text, VStack } from '@gluestack-ui/themed';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as LocalAuthentication from 'expo-local-authentication';
import React from 'react';
import { Platform } from 'react-native';
import { Auth } from '../../functions/Auth';
import { Image } from '@gluestack-ui/themed';
import { Asset } from 'expo-asset';

type AuthScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'auth-screen'
>;
type AuthScreenRouteProp = RouteProp<RootStackParamList, 'auth-screen'>;

interface AuthScreenProps {
  navigation?: AuthScreenNavigationProp;
  route?: AuthScreenRouteProp;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const autenticar = async () => {
    try {
      const result = await Auth();
      if (result) {
        navigation?.navigate('tab-bottom');
      } else {
        if (Platform.OS === 'android') {
          await LocalAuthentication.cancelAuthenticate();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box w="$full" h="$full" justifyContent="center" alignItems="center">
      <VStack alignItems="center" gap="$5">
        <Image
          rounded="$2xl"
          alt="Logo Stokio"
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          source={{ uri: Asset.fromModule(require('$assets/icon.png')).uri }}
        />
        <Text size="3xl">Realizar a authenticação</Text>
        <Button rounded="$3xl" h="$12" px="$24" onPress={autenticar}>
          <ButtonText>Autenticar-se</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};

export { AuthScreen };
