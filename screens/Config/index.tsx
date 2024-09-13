import exportDatabase from './functions/export_database';
import importDatabase from './functions/export_database';
import {
  Box,
  Button,
  ButtonText,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';

const ConfigurationsScreen: React.FC = () => {
  return (
    <ScrollView>
      <Box h="$full" w="$full" alignItems="center">
        <VStack gap="$10" mt="$5" w="$4/5">
          <Box>
            <Text textAlign="center" size="3xl">
              Configurations Screen
            </Text>
          </Box>
          <Box>
            <Button onPress={importDatabase}>
              <ButtonText>Importar Dados</ButtonText>
            </Button>
          </Box>
          <Box>
            <Button onPress={exportDatabase}>
              <ButtonText>Exportar Dados</ButtonText>
            </Button>
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default ConfigurationsScreen;
