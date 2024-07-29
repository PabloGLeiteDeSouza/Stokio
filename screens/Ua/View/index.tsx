import { UnidadeDeArmazenamento } from '$classes/ua';
import { UpdateUnidadeDeArmazenamentoDto } from '$classes/ua/dto/update-ua.dto';
import { Text } from '@gluestack-ui/themed';
import { Box, ScrollView } from '@gluestack-ui/themed';
import { useIsFocused } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { Alert } from 'react-native';

const View: React.FC = () => {
  const isFocused = useIsFocused();
  const db = useSQLiteContext();

  const [itens, setItens] = React.useState<
    Array<UpdateUnidadeDeArmazenamentoDto>
  >([]);
  const [isLoadingItens, setIsLoadingItems] = React.useState(true);

  React.useEffect(() => {}, [isFocused]);

  React.useEffect(() => {
    async function Start() {
      try {
        const uas = await new UnidadeDeArmazenamento(db).findAll();
        setItens(uas);
        setIsLoadingItems(false);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', (error as Error).message);
        setIsLoadingItems(false);
      }
    }
    Start();
  }, []);

  return (
    <ScrollView>
      <Box>
        <Text>Unidades de Armazenamento</Text>
      </Box>
    </ScrollView>
  );
};
export default View;
