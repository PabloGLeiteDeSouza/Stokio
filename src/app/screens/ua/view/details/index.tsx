import { UnidadeDeArmazenamentoObject } from '@/classes/ua/interfaces';
import UaService from '@/classes/ua/ua.service';
import ButtonDelete from '@/components/Custom/Buttons/Delete';
import LoadingScreen from '@/components/LoadingScreen';
import { DetalhesUaScreen } from '@/interfaces/ua';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  EditIcon,
  Heading,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { Alert } from 'react-native';

const Details: React.FC<DetalhesUaScreen> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.id) {
    navigation?.navigate('visualizar-uas');
    return null;
  }

  const { id } = route.params;
  const db = useSQLiteContext();
  const [isLoading, setIsLoading] = React.useState(true);
  const [ua, setUa] = React.useState<UnidadeDeArmazenamentoObject>({
    id: 0,
    nome: '',
    descricao: '',
    tipo_ua: {
      id: 0,
      nome: '',
      descricao: '',
    },
    id_tipo_ua: 0,
  });


  const start = async () => {
    try {
      const data = await new UaService(db).findStorageUnitById(id);
      console.log(data);
      setUa(data);
      setIsLoading(false);
    } catch (err) {
      Alert.alert('Erro', (err as Error).message);
      navigation?.navigate('visualizar-uas');
    }
  }



  React.useEffect(() => {
    start()
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box w="$full" h="$full">
      <ScrollView w="$full">
        <Box w="$full" gap="$5" px="$8" py="$5">
          <Box w="$full" alignItems="center">
            <Text size="3xl">Detalhes da Ua</Text>
          </Box>
          <Box gap="$8">
            <Box gap="$1.5">
              <Heading>Nome:</Heading>
              <Text>{ua.nome}</Text>
            </Box>
            {ua.descricao !== "" && (
              <Box gap="$1.5">
                <Heading>Descricao</Heading>
                <Text>{ua.descricao}</Text>
              </Box>
            )}
            <Box gap="$3">
              <Heading>Tipo de unidade de armazenamento</Heading>
              <Box gap="$1.5">
                <Heading>Nome</Heading>
                <Text>{ua.tipo_ua.nome}</Text>
              </Box>
              {ua.tipo_ua.descricao !== "" && (
                <Box gap="$1.5">
                  <Heading>Descricao</Heading>
                  <Text>{ua.tipo_ua.descricao}</Text>
                </Box>
              )}
            </Box>
            <Box gap="$5">
              <Button
                onPress={() => navigation?.navigate('atualizar-ua', { id: ua.id })}
                gap="$5"
              >
                <ButtonText>Editar</ButtonText>
                <ButtonIcon as={EditIcon} />
              </Button>
              <ButtonDelete
                delete_message={`Tem certeza que deseja deletar?`}
              />
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Details;
