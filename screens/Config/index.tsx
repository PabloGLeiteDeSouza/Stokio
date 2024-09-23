import {
  Box,
  Button,
  ButtonText,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import exportDatabase from './functions/export_database';
import importDatabase from './functions/import_database';

const ConfigurationsScreen: React.FC = () => {
  return (
    <ScrollView>
      <Box h="$full" w="$full" py="$5" px="$5">
        <Text textAlign="center" size="3xl" mb="$5">
          Configuracoes
        </Text>
        <VStack gap="$5">
          <Box>
            <Button onPress={exportDatabase}>
              <ButtonText>Exportar dados</ButtonText>
            </Button>
          </Box>
          <Box>
            <Button onPress={importDatabase}>
              <ButtonText>Importar dados</ButtonText>
            </Button>
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default ConfigurationsScreen;
