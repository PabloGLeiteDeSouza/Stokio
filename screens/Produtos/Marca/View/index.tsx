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
const View: React.FC<ListarMarcasScreenProps> = ({ navigation }) => {
  const db = useSQLiteContext();
  const [marca, setMarca] = React.useState<Array<UpdateMarcaDto>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [buscar, setBuscar] = React.useState('');
  React.useEffect(() => {
    start(db, setMarca, setIsLoading, Alert);
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <ScrollView>
      <Box>
        {marca.length > 1 ? (
          <Box>
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
            <Box>
              <Box>
                {marca.map((item, index) => (
                  <Box key={index}>
                    <HStack>
                      <VStack>
                        <Text>{item.nome}</Text>
                      </VStack>
                      <VStack>
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
          </Box>
        ) : (
          <Box>
            <Box>
              <Text>Marca não encontrada</Text>
              <Button
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
      </Box>
    </ScrollView>
  );
};
export default View;
