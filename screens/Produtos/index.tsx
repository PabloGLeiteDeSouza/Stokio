import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastrarProdutosScreen from './CadastrarProdutos';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  ScrollView,
} from '@gluestack-ui/themed';
import React from 'react';
import { Text } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { useThemeApp } from '$providers/theme';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

type ListarProdutosScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'listar-produtos'
>;
type ListarProdutosScreenRouteProp = RouteProp<
  RootStackParamList,
  'listar-produtos'
>;

interface ListarProdutosScreenProps {
  navigation?: ListarProdutosScreenNavigationProp;
  route?: ListarProdutosScreenRouteProp;
}

const ProdutosScreens: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="listar-produtos">
      <Stack.Screen
        name="cadastrar-produtos"
        component={CadastrarProdutosScreen}
        options={{ title: 'Cadastrar Produtos' }}
      />
      <Stack.Screen
        name="listar-produtos"
        component={ListarProdutosScreen}
        options={{ title: 'Listar Produtos' }}
      />
    </Stack.Navigator>
  );
};

const ListarProdutosScreen: React.FC<ListarProdutosScreenProps> = ({
  navigation,
  route,
}) => {
  const [haveProducts, setHaveProducts] = React.useState(false);
  const { theme } = useThemeApp();

  React.useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      {haveProducts ? (
        <ScrollView>
          <Box></Box>
        </ScrollView>
      ) : (
        <Box w="$full" h="$full" alignItems="center" justifyContent="center">
          <Box gap={10}>
            <Text size="xl" textAlign="center">
              Não há produtos cadastrados
            </Text>
            <Button
              $active-bgColor={theme === 'dark' ? '$purple700' : '$purple500'}
              $dark-backgroundColor="$purple500"
              $light-backgroundColor="$purple700"
              gap={10}
              onPress={() => navigation?.navigate('cadastrar-produtos')}
            >
              <ButtonText>Cadastrar Produtos</ButtonText>
              <ButtonIcon
                color="$white"
                as={() => (
                  <Ionicons name="add-circle" size={15} color="white" />
                )}
              />
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProdutosScreens;
