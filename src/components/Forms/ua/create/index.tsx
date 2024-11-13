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
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Button,
  ButtonText,
  Box,
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
  Text,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  Card,
} from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { Alert, GestureResponderEvent } from 'react-native';
import UaService from '@/classes/ua/ua.service';
import { IFormCreateUa } from './interface';

const FormCreateUa: React.FC<IFormCreateUa> = ({ db, onSubimited, haveTipoUa }) => {
  const [isNewTipoUa, setIsNewTipoUa] = React.useState(!haveTipoUa);
  return (
    <>
      <Formik
        initialValues={{
          nome: '',
          descricao: '',
          tipo_ua: {
            id: 0,
            nome: '',
            descricao: '',
          },
        }}
        onSubmit={async (values) => {
          try {
            await new UaService(db).create(values);
            Alert.alert("Sucesso", "Unidade de Armazenamento cadastrada com sucesso!")
            onSubimited();
          } catch (error) {
            Alert.alert('Error', (error as Error).message);
          }
        }}
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
                    value={values.descricao}
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
                  <FormControlErrorText>{errors.descricao}</FormControlErrorText>
                </FormControlError>
              </FormControl>
              {isNewTipoUa ? (
                <>
                  <FormControl
                    isInvalid={false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>
                        Tipo de unidade de armazenamento
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        value={values.tipo_ua.nome}
                        placeholder="Tipo de ua nome"
                        onChangeText={handleChange('tipo_ua.nome')}
                      />
                    </Input>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Informe a nome do tipo de unidade de armazenamento.
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
                        Descricao Tipo de Unidade de Armazenamento
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
                        Informe uma descrição.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.tipo_ua?.descricao}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                </>
              ) : (
                <>
                  {values.tipo_ua.id !== 0 && (
                    <>
                      <Box>
                        <Card>
                          <Heading>Tipo de unidade de armazenamento</Heading>
                          <HStack>
                            <Text>Nome:</Text>
                            <Text>{values.tipo_ua.nome}</Text>
                          </HStack>
                          <VStack>
                            <Text>Descrição:</Text>
                            <Text>{values.tipo_ua.nome}</Text>
                          </VStack>
                        </Card>
                      </Box>
                    </>
                  )}
                  <Box gap="$5">
                    <Button onPress={() => {
                      onSelectTipoUa()
                    }}>
                      <ButtonText>{values.tipo_ua.id === 0 ? "Selecionar Tipo de UA" : "Atualizar Tipo de UA"}</ButtonText>
                    </Button>
                    <Button onPress={() => setIsNewTipoUa(true)}>
                      <ButtonText>
                        Cadastrar Tipo UA
                      </ButtonText>
                    </Button>
                  </Box>
                </>
              )}
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
    </>
  );
};
export default FormCreateUa;
