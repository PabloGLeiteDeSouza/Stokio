import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

export interface CardColumnProps
  extends React.ForwardRefExoticComponent<
    StyledComponentProps<
      StyleProp<ViewStyle>,
      unknown,
      ViewProps,
      'VStack',
      typeof View
    >
  > {}
