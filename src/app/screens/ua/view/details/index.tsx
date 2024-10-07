import ButtonDelete from '@/components/Custom/Buttons/Delete';
import LoadingScreen from '@/components/LoadingScreen';
import { DetalhesClienteScreen } from '@/interfaces/cliente';
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
import React from 'react';

const Details: React.FC<DetalhesClienteScreen> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.id) {
    navigation?.navigate('visualizar-uas');
  }

  const [isLoading, setIsLoading] = React.useState(true);
  const [ua, setUa] = React.useState({});

  React.useEffect(() => {
    setIsLoading(false);
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
          <Box gap="$5">
            <Box gap="$1.5">
              <Heading>Nome:</Heading>
              <Text>João</Text>
            </Box>
            <Box gap="$1.5">
              <Heading>Tipo</Heading>
              <Text>01/01/1990</Text>
            </Box>
            <Box gap="$5">
              <Button
                onPress={() => navigation?.navigate('atualizar-ua')}
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
