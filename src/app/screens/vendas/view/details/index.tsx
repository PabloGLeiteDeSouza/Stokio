import { DetalhesVendaScreen } from '@/interfaces/venda';
import {
  Box,
  Button,
  ButtonText,
  Heading,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';

const Details: React.FC<DetalhesVendaScreen> = ({ navigation }) => {
  return (
    <Box h="$full" w="$full">
      <ScrollView mx="$1">
        <VStack space="3xl" p="$8" gap="$5">
          <Box>
            <Heading size="xl">Detalhes da Venda</Heading>
          </Box>
          <Box gap="$8">
            <Box>
              <Text>Número do pedido:</Text>
              <Text>123456</Text>
            </Box>
            <Box>
              <Text>Nome do cliente:</Text>
              <Text>João da Silva</Text>
            </Box>
            <Box>
              <Text>Cpf:</Text>
              <Text>123.123.123-12</Text>
            </Box>
            <Box>
              <Text>Data de nascimento:</Text>
              <Text>12/10/1998</Text>
            </Box>
            <Box gap="$5">
              <Heading>Produtos</Heading>
              <Box gap="$5">
                <Box>
                  <Text>Nome:</Text>
                  <Text>Aadasdsad</Text>
                </Box>
                <Box>
                  <Text>Marca:</Text>
                  <Text>Aadasdsad</Text>
                </Box>
                <Box>
                  <Text>Tipo:</Text>
                  <Text>Aadasdsad</Text>
                </Box>
                <Box>
                  <Text>Quantidade:</Text>
                  <Text>1</Text>
                </Box>
                <Box>
                  <Text>Preço:</Text>
                  <Text>25,00</Text>
                </Box>
              </Box>
              <Box gap="$5">
                <Box>
                  <Text>Nome:</Text>
                  <Text>Aadasdsad</Text>
                </Box>
                <Box>
                  <Text>Marca:</Text>
                  <Text>Aadasdsad</Text>
                </Box>
                <Box>
                  <Text>Tipo:</Text>
                  <Text>Aadasdsad</Text>
                </Box>
                <Box>
                  <Text>Quantidade:</Text>
                  <Text>1</Text>
                </Box>
                <Box>
                  <Text>Preço:</Text>
                  <Text>25,00</Text>
                </Box>
              </Box>
              <Box gap="$5">
                <Box>
                  <Text>Nome:</Text>
                  <Text>Aadasdsad</Text>
                </Box>
                <Box>
                  <Text>Quantidade:</Text>
                  <Text>1</Text>
                </Box>
                <Box>
                  <Text>Preço:</Text>
                  <Text>25,00</Text>
                </Box>
              </Box>
              <Box gap="$5">
                <Box>
                  <Text>Nome:</Text>
                  <Text>Aadasdsad</Text>
                </Box>
                <Box>
                  <Text>Quantidade:</Text>
                  <Text>1</Text>
                </Box>
                <Box>
                  <Text>Preço:</Text>
                  <Text>25,00</Text>
                </Box>
              </Box>
              <Box gap="$5">
                <Box>
                  <Text>Nome:</Text>
                  <Text>Aadasdsad</Text>
                </Box>
                <Box>
                  <Text>Quantidade:</Text>
                  <Text>1</Text>
                </Box>
                <Box>
                  <Text>Preço:</Text>
                  <Text>25,00</Text>
                </Box>
              </Box>
            </Box>
            <Box>
              <Text>Valor da Venda:</Text>
              <Text>R$ 100,00</Text>
            </Box>
            <Box>
              <Text>Data da Venda:</Text>
              <Text>01/01/2022</Text>
            </Box>
            <Box>
              <Text>Status</Text>
              <Text>Pago</Text>
            </Box>
            <Box gap="$5">
              <Button
                onPress={() =>
                  navigation?.navigate('atualizar-venda', { id: 1 })
                }
              >
                <ButtonText>Editar</ButtonText>
              </Button>
              <Button action="negative">
                <ButtonText>Excluir</ButtonText>
              </Button>
            </Box>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Details;
