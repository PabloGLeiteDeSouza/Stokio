import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

export interface CardProps
  extends React.ForwardRefExoticComponent<
    StyledComponentProps<
      StyleProp<ViewStyle>,
      unknown,
      ViewProps,
      'HStack',
      typeof View
    >
  > {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}
