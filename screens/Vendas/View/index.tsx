import { Venda } from '$classes/Venda';
import { UpdateVendaDto } from '$classes/Venda/dto/update-venda.dto';
import { ButtonText, Text } from '@gluestack-ui/themed';
import { Button } from '@gluestack-ui/themed';
import { Box } from '@gluestack-ui/themed';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { Alert } from 'react-native';
import { ListarVendasScreenProps } from '../interfaces';

const View: React.FC<ListarVendasScreenProps> = ({ navigation }) => {
  const db = useSQLiteContext();

  const [vendas, setVendas] = React.useState<Array<UpdateVendaDto>>([]);

  React.useEffect(() => {
    async function start() {
      try {
        const vnds = await new Venda(db).findAll();
        if (vnds.length < 1) {
          throw new Error('Nao ha vendas cadastradas, cadastre uma venda!');
        }
        setVendas(vnds);
      } catch (error) {
        Alert.alert('Erro ao buscar vendas', (error as Error).message);
        throw error;
      }
    }
    start();
  }, []);

  return vendas.length < 1 ? (
    <Box>
      <Box>
        <Text>Nao ha vendas cadastradas</Text>
      </Box>
      <Box>
        <Button onPress={() => navigation?.navigate('cadastrar-venda')}>
          <ButtonText>Cadastrar Venda</ButtonText>
        </Button>
      </Box>
    </Box>
  ) : (
    <></>
  );
};

export default View;
