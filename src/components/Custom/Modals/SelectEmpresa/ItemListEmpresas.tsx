import {
  Card,
  Box,
  HStack,
  Text,
  Heading,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import { IItemListEmpresasProps } from './interfaces';
import React from 'react';

const ItemListEmpresas: React.FC<IItemListEmpresasProps> = ({
  item,
  onChangeItem,
  selectedEmpresa,
}) => {
  return (
    <Box w="$full" my="$2.5">
      <Card>
        <HStack space="xl">
          <Box justifyContent="center">
            <Button
              isDisabled={selectedEmpresa.id === item.id}
              onPress={() => {
                onChangeItem(item);
              }}
            >
              <ButtonText>
                {selectedEmpresa.id === item.id ? 'Selecionado' : 'Selecionar'}
              </ButtonText>
            </Button>
          </Box>
          <Box>
            <Heading>{item.nome_fantasia}</Heading>
            <Text>{item.razao_social}</Text>
            <Text>{item.cnpj}</Text>
          </Box>
        </HStack>
      </Card>
    </Box>
  );
};

export default ItemListEmpresas;
