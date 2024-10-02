import { AddIcon, Box, Fab, FabIcon, FabLabel } from '@gluestack-ui/themed';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React from 'react';
import LoadingScreen from '@components/LoadingScreen';
import { Alert } from 'react-native';
import { ParamListCodeScanner, RootStackParamList } from '$types/param-list';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

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
  const [screen, setScreen] =
    React.useState<ParamListCodeScanner>('listar-produtos');

  React.useEffect(() => {
    async function start() {
      try {
        if (!route || !route.params || !route.params.screen) {
          setScreen('listar-produtos');
          throw new Error('E necessario informar uma tela para retorno');
        }
        if (!permission?.granted) {
          const result = await requestPermission();
          if (!result) {
            throw new Error(
              'Nao e possivel escanear o codigo de barras em a permissao da camera!',
            );
          }
        }
        setIsLoading(true);
      } catch (error) {
        Alert.alert('Erro ao acessar a camera', (error as Error).message);
        setIsLoading(false);
        navigation?.navigate<ParamListCodeScanner>(screen);
        throw error;
      }
    }
    start();
  }, [requestPermission]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const Camera: React.FC = ({}) => {
    return (
      <CameraView
        onBarcodeScanned={(result) => {
          navigation?.navigate(screen, { code: result.data, result: true });
        }}
      />
    );
  };

  return (
    <Box w="$full" h="$full" as={Camera}>
      <Fab
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
      >
        <FabIcon as={AddIcon} mr="$1" />
        <FabLabel>{facing}</FabLabel>
      </Fab>
    </Box>
  );
};

export default CodeScanner;
