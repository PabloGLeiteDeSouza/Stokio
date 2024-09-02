import { VStack } from '@gluestack-ui/themed';
import { CardColumnProps } from './interfaces';

const CardColumn: React.FC<CardColumnProps> = (props) => {
  return <VStack {...props} />;
};

export default CardColumn;
