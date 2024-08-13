import { UpdateTipoDeProdutoDto } from '$classes/tipo_produto/dto/update-tipo-de-produto.dto';
import LoadingScreen from '$components/LoadingScreen';
import { AddIcon, Box, Button, ButtonIcon, ButtonText, ScrollView, Text } from '@gluestack-ui/themed';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import Start from './functions/start';
import { Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const View: React.FC<> = () => {

  const db = useSQLiteContext();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = React.useState(true);
  const [tipo, setTipo] = React.useState<Array<UpdateTipoDeProdutoDto>>([]);

  React.useEffect(() => {
    Start(db, setTipo, setIsLoading, Alert);
  }, [Start]);

  React.useEffect(() => {

  }, [isFocused])

  if (isLoading) {
    return <LoadingScreen/>
  }
  return (
    <>
      {
        tipo.length > 0 ? (

        ) : (
          <Box>
            <Box w="$full" alignItems="center" justifyContent="center" mt="$10">
              <Text size="2xl">Busque o tipo de produto</Text>
              <Button
                onPress={() => navigation?.navigate('cadastrar-tipo-produto')}
              >
                <ButtonIcon as={AddIcon} />
                <ButtonText>Cadastrar Tipo de Produto</ButtonText>
              </Button>
            </Box>
          </Box>
        )
      }
    </>
    <ScrollView>
      
    </ScrollView>
  );
};

export default View;
