import React from 'react';
import {
  AddIcon,
  Fab,
  FabIcon,
  FabLabel,
  Box,
  MenuIcon,
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  SearchIcon,
  Link,
  VStack,
  HStack,
  Avatar,
  AvatarImage,
  Heading,
  Text,
  Divider,
  Image,
  CheckboxIcon,
} from '@gluestack-ui/themed';
import { FontAwesome6 } from '@expo/vector-icons';
import useThemeApp from '@/hooks/useTheme';

const FabToggleTheme: React.FC = () => {
  const { toggleTheme, theme } = useThemeApp();

  return (
    <>
      <Fab onPress={toggleTheme} placement="bottom right" size={'lg'} mb="$12">
        <FabIcon
          as={(props: object) =>
            theme === 'dark' ? (
              <FontAwesome6 name="sun" {...props} />
            ) : (
              <FontAwesome6 name="moon" {...props} />
            )
          }
          size={'lg'}
        />
      </Fab>
    </>
  );
};

export default FabToggleTheme;
