import React, { useState } from 'react';
import {
  Button,
  ButtonText,
  Box,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  VStack,
  Heading,
  Text,
  Icon,
  CheckIcon,
  Spinner,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlHelper,
  FormControlErrorText,
  FormControlLabel,
  FormControlHelperText,
  FormControlLabelText,
  Textarea,
  TextareaInput,
} from '@gluestack-ui/themed';
import { Ramo } from '$classes/ramo';
import { SQLiteDatabase } from 'expo-sqlite';
import { SelecionarRamoProps } from './interfaces';
import { Alert } from 'react-native';
import { UpdateRamoDto } from '$classes/ramo/dto/update-ramo.dto';
import { ScrollView } from 'react-native-gesture-handler';
import { CloseIcon } from '@gluestack-ui/themed';
import { Input } from '@gluestack-ui/themed';
import { InputField } from '@gluestack-ui/themed';
import { AlertCircleIcon } from '@gluestack-ui/themed';

const SelecionarRamo: React.FC<SelecionarRamoProps> = ({
  db,
  onChangeRamo,
  errors,
  values,
  handleChange,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const ref = React.useRef(null);
  const [ramos, setRamos] = useState<Array<UpdateRamoDto>>([]);
  const [cadastrarRamo, setCadastrarRamo] = useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const changeValue = (value: boolean, ramo: UpdateRamoDto) => {
    if (value) {
      onChangeRamo(ramo);
      setShowModal(false);
    }
  };

  React.useEffect(() => {
    const Start = async (db: SQLiteDatabase) => {
      try {
        const rms = await new Ramo(db).findAll();
        setRamos(rms);
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Erro', (error as Error).message);
        throw error;
      }
    };
    Start(db);
  }, [db]);

  if (isLoading) {
    return (
      <Box>
        <Spinner size="small" />
        <Text>Carregando...</Text>
      </Box>
    );
  }

  return (
    <>
      {ramos.length > 0 && !cadastrarRamo ? (
        <>
          <Box>
            <Button onPress={() => setShowModal(!showModal)}>
              <ButtonText>Selecionar Ramo</ButtonText>
            </Button>
            <Modal
              isOpen={showModal}
              onClose={() => {
                setShowModal(false);
              }}
              finalFocusRef={ref}
            >
              <ModalBackdrop />
              <ModalContent>
                <ModalHeader>
                  <Heading size="lg">Ramos</Heading>
                  <ModalCloseButton>
                    <Icon as={CloseIcon} />
                  </ModalCloseButton>
                </ModalHeader>
                <ScrollView>
                  <ModalBody>
                    <Box>
                      <Heading size="md">Selecione um ramo:</Heading>
                    </Box>
                    <Box>
                      <VStack>
                        {ramos.map((ramo) => {
                          return (
                            <HStack key={ramo.id}>
                              <Box>
                                <Checkbox
                                  onChange={(value) => changeValue(value, ramo)}
                                  size="md"
                                  isInvalid={false}
                                  isDisabled={false}
                                  value={''}
                                >
                                  <CheckboxIndicator mr="$2">
                                    <CheckboxIcon as={CheckIcon} />
                                  </CheckboxIndicator>
                                </Checkbox>
                              </Box>
                              <Box>
                                <Heading size="md">{ramo.nome}</Heading>
                                <Text size="sm">{ramo.descricao}</Text>
                              </Box>
                            </HStack>
                          );
                        })}
                      </VStack>
                    </Box>
                  </ModalBody>
                </ScrollView>
              </ModalContent>
            </Modal>
            <Box>
              <Button onPress={() => setCadastrarRamo(true)}>
                <ButtonText>
                  <Text>Cadastrar novo ramo</Text>
                </ButtonText>
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <FormControl
            isInvalid={errors.ramo ? true : false}
            size={'md'}
            isDisabled={false}
            isRequired={true}
          >
            <FormControlLabel>
              <FormControlLabelText>Ramo</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                value={values.ramo}
                onChangeText={handleChange('ramo')}
                placeholder="Ramo da empresa"
              />
            </Input>

            <FormControlHelper>
              <FormControlHelperText>
                Informe o ramo da sua empresa.
              </FormControlHelperText>
            </FormControlHelper>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errors.ramo}</FormControlErrorText>
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
                type="text"
                value={values.descricao}
                onChangeText={handleChange('descricao')}
              />
            </Textarea>

            <FormControlHelper>
              <FormControlHelperText>
                Informe uma descricao para o ramo.
              </FormControlHelperText>
            </FormControlHelper>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errors.descricao}.</FormControlErrorText>
            </FormControlError>
          </FormControl>
        </>
      )}
    </>
  );
};
export default SelecionarRamo;
