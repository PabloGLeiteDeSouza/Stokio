import {
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
  Text,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  ChevronDownIcon,
} from '@gluestack-ui/themed';
import React from 'react';
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
  Button,
  ButtonText,
  Textarea,
  TextareaInput,
  AlertCircleIcon,
} from '@gluestack-ui/themed';
import { Box, Heading, ScrollView, VStack } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { GestureResponderEvent } from 'react-native';
import { CadastrarUaScreen } from '@/interfaces/ua';
const Create: React.FC<CadastrarUaScreen> = ({ navigation }) => {
  const [isLoadingScreen, setisLoadingScreen] = React.useState(true);
  React.useEffect(() => {
    async function Start() {
      try {
        setisLoadingScreen(false);
      } catch (error) {
        throw error;
      }
    }
    if (isLoadingScreen) {
      Start();
    }
  }, [isLoadingScreen]);
  return (
    <Box h="$full" w="$full" px="$1.5">
      <ScrollView w="$full">
        <VStack space="xl" py="$10">
          <Box w="$full" px="$8" alignItems="center">
            <Heading textAlign="center" size="xl">
              Cadastrar Unidade de Armazenamento:
            </Heading>
          </Box>
          <Box w="$full" px="$8">
            <Formik
              initialValues={{
                nome: '',
                decricao: '',
                tipo_ua: {
                  id: 0,
                  nome: '',
                  descricao: '',
                },
              }}
              onSubmit={() => {}}
            >
              {({ handleChange, handleSubmit, values, errors }) => {
                return (
                  <Box gap="$5">
                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Nome</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          value={values.nome}
                          placeholder="Nome"
                          onChangeText={handleChange('nome')}
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe um nome.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>{errors.nome}</FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={false}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Descricao</FormControlLabelText>
                      </FormControlLabel>
                      <Textarea>
                        <TextareaInput
                          value={values.decricao}
                          placeholder="descricao"
                          onChangeText={handleChange('descricao')}
                        />
                      </Textarea>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe a descricao.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                        {errors.decricao}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>
                          Tipo de unidade de medida
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          value={values.tipo_ua.nome}
                          placeholder="Descricao"
                          onChangeText={handleChange('tipo_ua.nome')}
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe a nome do tipo de unidade de medida.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.tipo_ua?.nome}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={false}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>
                          Descricao Tipo de Ua
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Textarea>
                        <TextareaInput
                          value={values.tipo_ua.descricao}
                          onChangeText={handleChange('tipo_ua.descricao')}
                        />
                      </Textarea>
                      <FormControlHelper>
                        <FormControlHelperText>
                          Must be atleast 6 characters.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          Atleast 6 characters are required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <Box>
                      <Button
                        onPress={
                          handleSubmit as unknown as (
                            event: GestureResponderEvent,
                          ) => void
                        }
                      >
                        <ButtonText>Cadastrar</ButtonText>
                      </Button>
                    </Box>
                  </Box>
                );
              }}
            </Formik>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
};
export default Create;
