import LoadingScreen from '@/components/LoadingScreen';
import { DetalhesEmpresaScreen } from '@/interfaces/empresa';
import {
  Box,
  Button,
  ButtonText,
  Heading,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import React from 'react';

const Details: React.FC<DetalhesEmpresaScreen> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.id) {
    navigation?.navigate('visualizar-empresas');
  }

  const [isLoading, setIsLoading] = React.useState(true);
  const [empresa, setEmpresa] = React.useState({});

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
            <Text size="3xl">Detalhes da Empresa</Text>
          </Box>
          <Box gap="$5">
            <Box gap="$1.5">
              <Heading>Nome:</Heading>
              <Text>João</Text>
            </Box>
            <Box>
              <Heading>Razao Social:</Heading>
              <Text>João</Text>
            </Box>
            <Box>
              <Heading>Nome Fantasia:</Heading>
              <Text>João</Text>
            </Box>
            <Box gap="$1.5">
              <Heading>Data de nascimento:</Heading>
              <Text>01/01/1990</Text>
            </Box>
            <Box gap="$1.5">
              <Heading>CPF:</Heading>
              <Text>123456789</Text>
            </Box>
            <Box>
              <Heading>CNPJ:</Heading>
              <Text>12345678901234</Text>
            </Box>
            <Box gap="$1.5">
              <Heading>Endereço:</Heading>
              <Box gap="$1.5">
                <Heading>Rua:</Heading>
                <Text>Rua João</Text>
              </Box>
              <Box gap="$1.5">
                <Heading>Número:</Heading>
                <Text>123</Text>
              </Box>
              <Box gap="$1.5">
                <Heading>Complemento:</Heading>
                <Text>Complemento</Text>
              </Box>
              <Box gap="$1.5">
                <Heading>Bairro:</Heading>
                <Text>Bairro João</Text>
              </Box>
              <Box gap="$1.5">
                <Heading>Cidade:</Heading>
                <Text size="xl">Cidade João</Text>
              </Box>
              <Box gap="$1.5">
                <Heading>UF:</Heading>
                <Text size="xl">SP</Text>
              </Box>
            </Box>
            <Box gap="$1.5">
              <Heading>Telefones:</Heading>
              <Text size="lg">123456789</Text>
            </Box>
            <Box gap="$1.5">
              <Heading>Emails:</Heading>
              <Text size="xl">joaojones@teste.com</Text>
            </Box>
            <Box gap="$5">
              <Button onPress={() => navigation?.navigate('atualizar-empresa')}>
                <ButtonText>Editar</ButtonText>
              </Button>
              <Button action="negative">
                <ButtonText>Excluir</ButtonText>
              </Button>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Details;
