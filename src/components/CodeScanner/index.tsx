import {
  AddIcon,
  Box,
  Fab,
  FabIcon,
  FabLabel,
  SafeAreaView,
} from '@gluestack-ui/themed';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React from 'react';
import LoadingScreen from '@components/LoadingScreen';
import { Alert } from 'react-native';
import { ParamListCodeScanner, RootStackParamList } from '$types/param-list';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Text } from '@gluestack-ui/themed';

type CodeScannerNavigationProp = StackNavigationProp<
  RootStackParamList,
  'code-scanner'
>;
type CodeScannerRouteProp = RouteProp<RootStackParamList, 'code-scanner'>;

interface CodeScannerProps {
  navigation?: CodeScannerNavigationProp;
  route?: CodeScannerRouteProp;
}

const CodeScanner: React.FC<CodeScannerProps> = ({ navigation, route }) => {
  const [facing, setFacing] = React.useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = React.useState(true);
  const [screen, setScreen] = React.useState<ParamListCodeScanner>(
    'visualizar-produtos',
  );
  const [hideCamera, setHideCamera] = React.useState(false);

  React.useEffect(() => {
    async function start() {
      try {
        if (!route || !route.params || !route.params.screen) {
          throw new Error('E necessario informar uma tela para retorno');
        } else {
          setScreen(route.params.screen);
        }
        if (!permission?.granted) {
          const result = await requestPermission();
          if (!result) {
            throw new Error(
              'Nao e possivel escanear o codigo de barras em a permissao da camera!',
            );
          }
        }
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Erro ao acessar a camera', (error as Error).message);
        setIsLoading(false);
        navigation?.goBack();
        throw error;
      }
    }
    start();
  }, [requestPermission]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const Camera = (props: object) => {
    return (
      <CameraView
        onBarcodeScanned={(result) => {
          if (!/^[0-9]*$/.test(result.data)) {
            setHideCamera(true);
            Alert.alert('Erro', 'código inválido', [
              {
                text: 'Ok',
                onPress: () => navigation?.goBack(),
              },
            ]);
            return;
          }
          navigation?.navigate(screen, { code: result.data, result: true });
        }}
        {...props}
      />
    );
  };

  return hideCamera ? <></> : <Box w="$full" h="$full" as={Camera}></Box>;
};

export default CodeScanner;
