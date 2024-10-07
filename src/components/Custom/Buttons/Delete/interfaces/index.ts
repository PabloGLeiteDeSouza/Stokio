import { GestureResponderEvent } from 'react-native';

export interface ButtonDeleteProps {
  delete_message: string;
  isMinified?: boolean;
  onPress?: (event: GestureResponderEvent) => void | null;
}
