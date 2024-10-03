import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreensRamo from './ramo';
import ScreensMarca from './marca';
import ScreensTipoUA from './tipo_ua';
import ScreensUM from './um';
import {
  Box,
  Button,
  ButtonText,
  Divider,
  Heading,
  ScrollView,
} from '@gluestack-ui/themed';
import ScreensTipoProduto from './tipo_produtos';
import { ConfiguracoesScreenProps } from '@/interfaces/config';

const Stack = createNativeStackNavigator();

const ConfigScreens: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="configuracoes"
        component={ConfigScreen}
        options={{
          title: 'Configurações',
        }}
      />
      <Stack.Screen
        name="screens-ramos"
        component={ScreensRamo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="screens-marcas"
        component={ScreensMarca}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="screens-tipos-uas"
        component={ScreensTipoUA}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="screens-ums"
        component={ScreensUM}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="screens-tipos-produtos"
        component={ScreensTipoProduto}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const ConfigScreen: React.FC<ConfiguracoesScreenProps> = ({ navigation }) => {
  return (
    <ScrollView>
      <Box w="$full" alignItems="center">
        <Box w="$3/4" gap="$5" my="$5">
          <Box>
            <Heading textAlign="center" size="xl">
              Recursos adicionais:
            </Heading>
          </Box>
          <Box>
            <Button>
              <ButtonText>Importar Dados</ButtonText>
            </Button>
          </Box>
          <Box mb="$5">
            <Button>
              <ButtonText>Exportar Dados</ButtonText>
            </Button>
          </Box>
          <Divider />
          <Box>
            <Heading textAlign="center" size="xl">
              Telas adicionais
            </Heading>
          </Box>
          <Box>
            <Button onPress={() => navigation?.navigate('screens-ramos')}>
              <ButtonText>Ramos</ButtonText>
            </Button>
          </Box>
          <Box>
            <Button onPress={() => navigation?.navigate('screens-marcas')}>
              <ButtonText>Marcas</ButtonText>
            </Button>
          </Box>
          <Box>
            <Button onPress={() => navigation?.navigate('screens-tipos-uas')}>
              <ButtonText>Tipos de UAs</ButtonText>
            </Button>
          </Box>
          <Box>
            <Button onPress={() => navigation?.navigate('screens-ums')}>
              <ButtonText>UMs</ButtonText>
            </Button>
          </Box>
          <Box>
            <Button
              onPress={() => navigation?.navigate('screens-tipos-produtos')}
            >
              <ButtonText>Tipos de produtos</ButtonText>
            </Button>
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default ConfigScreens;
