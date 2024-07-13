import { useStorage } from '$providers/storage';
import { RootStackParamList } from '$types/index';
import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as LocalAuthentication from 'expo-local-authentication';
import React from 'react';
import { Platform } from 'react-native';
import { Auth } from '../../functions/Auth';

type AuthScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'auth-screen'
>;
type AuthScreenRouteProp = RouteProp<RootStackParamList, 'auth-screen'>;

interface AuthScreenProps {
  navigation?: AuthScreenNavigationProp;
  route?: AuthScreenRouteProp;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation, route }) => {
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
      <Box>
        <Text>Realizar a authenticação:</Text>
        <Button onPress={autenticar}>
          <ButtonText>Autenticar-se</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export { AuthScreen };
