import { Box, Button, ButtonText, ScrollView, Text, VStack } from '@gluestack-ui/themed';

const ConfigurationsScreen: React.FC = () => {

  return (
    <ScrollView>
      <Box h="$full" w="$full">
        <VStack>
            <Box>
                <Text size="xl">Configurations</Text>
            </Box>
            <Box>
                <Text size="lg">Exportar dados da aplicação:</Text>
                <Button>
                    <ButtonText>
                        Exportar
                    </ButtonText>
                </Button>
            </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default ConfigurationsScreen;
