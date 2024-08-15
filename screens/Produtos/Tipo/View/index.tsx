import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Input,
  InputField,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Textarea,
  TextareaInput,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  VStack,
  Heading,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  EditIcon,
} from '@gluestack-ui/themed';

import { UpdateTipoDeProdutoDto } from '$classes/tipo_produto/dto/update-tipo-de-produto.dto';
import LoadingScreen from '$components/LoadingScreen';
import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import Start from './functions/start';
import { Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { ListarTiposDeProdutosProps } from './interfaces';
const View: React.FC<ListarTiposDeProdutosProps> = ({ navigation }) => {
  const db = useSQLiteContext();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = React.useState(true);
  const [tipo, setTipo] = React.useState<Array<UpdateTipoDeProdutoDto>>([]);
  const [buscar, setBuscar] = React.useState<string>('');
  React.useEffect(() => {
    Start(db, setTipo, setIsLoading, Alert);
  }, [Start]);
  React.useEffect(() => {}, [isFocused]);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      {tipo.length > 0 ? (
        <ScrollView>
          <Box>
            <Box justifyContent="center">
              <Text size="2xl">Tipos de Produtos</Text>
              <Box>
                <FormControl
                  isInvalid={false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Buscar</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="text"
                      onChangeText={(text) => setBuscar(text)}
                      value={buscar}
                      placeholder="buscar..."
                    />
                  </Input>
                </FormControl>
              </Box>
            </Box>
            <Box>
              {tipo.map((item, index) => (
                <Box key={index}>
                  <HStack>
                    <VStack>
                      <Box>
                        <Text>{item.nome}</Text>
                      </Box>
                      <Box>
                        <Text>{item.descricao}</Text>
                      </Box>
                    </VStack>
                    <VStack>
                      <Button
                        onPress={() => {
                          navigation?.navigate('editar-tipo-produto', {
                            tipo_de_produto: item,
                          });
                        }}
                      >
                        <ButtonIcon as={EditIcon} />
                      </Button>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </Box>
          </Box>
        </ScrollView>
      ) : (
        <Box>
          <Box w="$full" h="$full" alignItems="center" justifyContent="center">
            <Box w="$3/4" gap="$5">
              <Text textAlign="center" size="2xl">
                Não há tipos de produtos cadastrados.
              </Text>
              <Button
                onPress={() => navigation?.navigate('cadastrar-tipo-produto')}
              >
                <ButtonIcon as={AddIcon} />
                <ButtonText>Cadastrar Tipo de Produto</ButtonText>
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default View;
