import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Button,
  ButtonText,
  HStack,
  VStack,
  ButtonIcon,
  SearchIcon,
  AddIcon,
  TrashIcon,
  EditIcon,
} from '@gluestack-ui/themed';

import { UpdateMarcaDto } from '$classes/marca/dto/update-marca.dto';
import LoadingScreen from '$components/LoadingScreen';
import { Box, ScrollView, Text } from '@gluestack-ui/themed';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import start from './functions/start';
import { Alert } from 'react-native';
import search from './functions/search';
import { ListarMarcasScreenProps } from './interfaces';
import { useIsFocused } from '@react-navigation/native';

const View: React.FC<ListarMarcasScreenProps> = ({ navigation }) => {
  const db = useSQLiteContext();
  const isFocused = useIsFocused();
  const [marca, setMarca] = React.useState<Array<UpdateMarcaDto>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [buscar, setBuscar] = React.useState('');
  React.useEffect(() => {
    start(db, setMarca, setIsLoading, Alert);
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    start(db, setMarca, setIsLoading, Alert);
  }, [isFocused]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      {marca.length > 0 ? (
        <ScrollView>
          <Box w="$full" h="$full" alignItems="center">
            <Box w="$4/5" my="$5">
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
                    value={buscar}
                    placeholder="Buscar..."
                    onChangeText={(text) => setBuscar(text)}
                  />
                  <Button
                    onPress={async () => {
                      await search(db, buscar, setMarca, Alert);
                    }}
                  >
                    <ButtonIcon as={SearchIcon} />
                  </Button>
                </Input>
              </FormControl>
            </Box>
            <Box w="$4/5" mb="$5">
              <Button
                gap="$2"
                onPress={() => navigation?.navigate('cadastrar-marca')}
              >
                <ButtonIcon as={AddIcon} />
                <ButtonText>Adicionar Marcas</ButtonText>
              </Button>
            </Box>
            <Box gap="$8">
              {marca.map((item, index) => (
                <Box
                  w="$4/5"
                  p="$5"
                  rounded="$lg"
                  $dark-bgColor="$purple800"
                  $light-bgColor="$purple300"
                  key={index}
                >
                  <HStack w="$full" justifyContent="space-between">
                    <VStack w="$3/4">
                      <Text size="2xl">{item.nome}</Text>
                      <Text size="sm">{item.descricao}</Text>
                    </VStack>
                    <VStack gap="$2.5">
                      <Button
                        onPress={async () => {
                          navigation?.navigate('editar-marca');
                        }}
                      >
                        <ButtonIcon as={EditIcon} />
                      </Button>
                      <Button action="negative">
                        <ButtonIcon as={TrashIcon} />
                      </Button>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </Box>
          </Box>
        </ScrollView>
      ) : (
        <Box
          w="$full"
          h="$full"
          justifyContent="center"
          alignItems="center"
          gap="$5"
        >
          <Box
            w="$full"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap="$3.5"
          >
            <Text size="2xl">Marca não encontrada</Text>
            <Button
              w="$2/3"
              onPress={async () => {
                navigation?.navigate('cadastrar-marca');
              }}
            >
              <ButtonIcon as={AddIcon} />
              <ButtonText>Cadastrar Marca</ButtonText>
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
export default View;
