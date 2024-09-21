import { RootStackParamList } from '$types/index';
import { Text } from '@gluestack-ui/themed';
import { Box, Button, ButtonText, HStack } from '@gluestack-ui/themed';
import { StackNavigationProp } from '@react-navigation/stack';

type ListarProdutosScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'listar-produtos'
>;
interface NavigationBarProps {
  navigation: ListarProdutosScreenNavigationProp;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ navigation }) => {
  return (
    <Box
      flexDirection="row"
      position="absolute"
      bottom="$20"
      w="$full"
      alignItems="center"
      justifyContent="center"
    >
      <HStack
        w="$80"
        h="$16"
        justifyContent="center"
        alignItems="center"
        rounded="$full"
        $light-bgColor="$purple600"
        $dark-bgColor="$purple900"
      >
        <Box>
          <Button
            $light-bgColor="$purple600"
            $dark-bgColor="$purple900"
            rounded="$full"
            onPress={() => navigation.navigate('screens-tipos-produtos')}
          >
            <ButtonText>Tipo de produto</ButtonText>
          </Button>
        </Box>
        <Box>
          <Button
            $light-bgColor="$purple600"
            $dark-bgColor="$purple900"
            rounded="$full"
            onPress={() => navigation.navigate('screens-marcas')}
          >
            <ButtonText>Marcas</ButtonText>
          </Button>
        </Box>
        <Box>
          <Button
            $light-bgColor="$purple600"
            $dark-bgColor="$purple900"
            rounded="$full"
            onPress={() => navigation.navigate('screens-ums')}
          >
            <ButtonText>Um</ButtonText>
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default NavigationBar;
