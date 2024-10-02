import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreensRamo from './ramo';
import ScreensMarca from './marca';
import ScreensTipoUA from './tipo_ua';
import ScreensUM from './um';

const Stack = createNativeStackNavigator();

const ConfigScreens: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="configuracoes" component={ConfigScreen} />
      <Stack.Screen name="screens-ramo" component={ScreensRamo} />
      <Stack.Screen name="screens-marca" component={ScreensMarca} />
      <Stack.Screen name="screens-tipo-ua" component={ScreensTipoUA} />
      <Stack.Screen name="screens-um" component={ScreensUM} />
    </Stack.Navigator>
  );
};

const ConfigScreen: React.FC = () => {
  return <></>;
};

export default ConfigScreens;
