import { Ramo } from '$classes/ramo';
import { UpdateRamoDto } from '$classes/ramo/dto/update-ramo.dto';
import LoadingScreen from '$components/LoadingScreen';
import { AddIcon, Card, Heading } from '@gluestack-ui/themed';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { Alert } from 'react-native';

const View: React.FC = () => {
  const db = useSQLiteContext();

  const [ramos, setRamos] = React.useState<Array<UpdateRamoDto>>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function start() {
      try {
        const ramos = await new Ramo(db).findAll();
        setRamos(ramos);
        setLoading(false);
      } catch (error) {
        Alert.alert('Erro', (error as Error).message);
        setLoading(false);
      }
    }
    start();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {ramos.length > 0 ? (
        <ScrollView>
          <Box gap="$5">
            {ramos.map((ramo) => (
              <Card size="md" variant="elevated" m="$3">
                <Heading>{ramo.nome}</Heading>
                <Box>
                  <Text>{ramo.descricao}</Text>
                </Box>
              </Card>
            ))}
          </Box>
        </ScrollView>
      ) : (
        <Box>
          <Text>Nao ha ramos cadastrados</Text>
          <Box>
            <Button>
              <ButtonText>Cadastrar ramo</ButtonText>
              <ButtonIcon as={AddIcon} />
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default View;
