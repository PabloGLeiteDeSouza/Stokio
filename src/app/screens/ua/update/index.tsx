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
import { Alert, GestureResponderEvent } from 'react-native';
import LoadingScreen from '@/components/LoadingScreen';
import { useSQLiteContext } from 'expo-sqlite';
import UaService from '@/classes/ua/ua.service';
import { AtualizarUaScreen } from '@/interfaces/ua';
import { UnidadeDeArmazenamentoObject, UnidadeDeArmazenamentoUpdate } from '@/classes/ua/interfaces';

const Update: React.FC<AtualizarUaScreen> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.id) {
    navigation?.goBack();
    return null;
  }
  const id = route.params.id;
  const [isLoadingScreen, setisLoadingScreen] = React.useState(true);
  const [ua, setUa] = React.useState<UnidadeDeArmazenamentoUpdate>({
    id: 0,
    nome: '',
    descricao: '',
    tipo_ua: {
      id: 0,
      nome: '',
      descricao: '',
    }
  })
  const db = useSQLiteContext();
  async function Start() {
    try {
      const data = await new UaService(db).findStorageUnitById(id);
      setUa(data);
      setisLoadingScreen(false);
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
      navigation?.goBack();
      throw error;
    }
  }
  React.useEffect(() => {
    if (isLoadingScreen) {
      Start();
    }
  }, [isLoadingScreen]);


  if (isLoadingScreen) {
    return <LoadingScreen />
  }


  return (
    <Box h="$full" w="$full" px="$1.5">
      <ScrollView w="$full">
        <VStack space="xl" py="$10">
          <Box w="$full" px="$8" alignItems="center">
            <Heading textAlign="center" size="xl">
              Atualizar Unidade de Armazenamento:
            </Heading>
          </Box>
          <Box w="$full" px="$8">
            <Formik
              initialValues={ua}
              onSubmit={async (values) => {
                try {
                  await new UaService(db).update(values);
                  Alert.alert("Sucesso", "Atualizacao realizada com sucesso");
                  navigation?.navigate('visualizar-uas');
                } catch (error) {
                  Alert.alert("Erro", (error as Error).message);
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
                          value={values.descricao ? values.descricao : ''}
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
                          {errors.descricao}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <Box>
                      <Button onPress={() => {
                        navigation?.navigate('selecionar-tipo-ua', {
                          screen: 'atualizar-ua',
                          tipo_ua: values.tipo_ua,
                        })
                      }}>
                        <ButtonText>
                          Selecionar Tipo de Ua
                        </ButtonText>
                      </Button>
                    </Box>
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
                          value={values.tipo_ua.descricao ? values.tipo_ua.descricao : ''}
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
                        <ButtonText>Atualizar</ButtonText>
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

export default Update;
