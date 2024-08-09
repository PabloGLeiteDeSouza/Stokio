import { Box, ScrollView, Text } from '@gluestack-ui/themed';

const View: React.FC = () => {
  return (
    <ScrollView>
      <Box>
        <Box w="$full" alignItems="center" justifyContent="center" mt="$10">
          <Text size="2xl">Busque o tipo de produto</Text>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default View;
