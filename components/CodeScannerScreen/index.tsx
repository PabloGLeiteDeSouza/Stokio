import { Box } from "@gluestack-ui/themed";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import { RootStackParamList, ScreensScanCode } from "../../types";
import React from "react";
import * as SplashScreen from 'expo-splash-screen'
import { Alert } from "react-native";


type CodeScannerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'code-scanner'>;
type CodeScannerScreenRouteProp = RouteProp<RootStackParamList, 'code-scanner'>;

interface CodeScannerScreenProps {
  navigation?: CodeScannerScreenNavigationProp;
  route?: CodeScannerScreenRouteProp;
};

SplashScreen.preventAutoHideAsync();

const CodeScannerScreen: React.FC<CodeScannerScreenProps> = ({navigation, route}) => {

    const [permition, getPermition] = useCameraPermissions();
    const [isLoad, setIsLoad] = React.useState(true);

    React.useEffect(() => {
        async function Start() {
            console.log("hello")
            if (permition?.granted) {
                setIsLoad(false)
                SplashScreen.hideAsync()
            } else{
                const perm = await getPermition();
                if (perm.granted) {
                    setIsLoad(false)
                    SplashScreen.hideAsync()
                } else {
                    setIsLoad(false)
                    SplashScreen.hideAsync();
                    Alert.alert("Erro", "Para fazer a leitura do código de barras é necessário permitir o uso da câmera");
                    navigation?.navigate(route?.params?.screen as ScreensScanCode, {result: false,})
                }
            }
        }
        Start()
    },[])

    if (isLoad) {
        return null
    }

    const onScanBarCode = (scanningResult: BarcodeScanningResult) => {
        if (route?.params?.screen) {
            navigation?.navigate(route.params.screen as ScreensScanCode, {code: scanningResult.data, result: true})
        }
    }

    
    const codeScannerView = (props: any) => (<CameraView onBarcodeScanned={onScanBarCode} {...props} />)

    return (
        <Box w="$full" h="$full" as={codeScannerView} >

        </Box>    
    )
}

export default CodeScannerScreen;