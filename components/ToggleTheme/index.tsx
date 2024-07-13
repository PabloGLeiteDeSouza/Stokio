import { useThemeApp } from '$providers/theme';
import { FontAwesome6 } from '@expo/vector-icons';
import { Button, ButtonIcon } from '@gluestack-ui/themed';

const ToggleTheme: React.FC = () => {
  const { theme, toggleTheme } = useThemeApp();

  return (
    <Button
      $active-bgColor={theme === 'dark' ? '$purple700' : '$purple500'}
      rounded="$full"
      h={50}
      w={50}
      $dark-backgroundColor="$purple500"
      $light-backgroundColor="$purple700"
      position="absolute"
      right="$5"
      bottom="$16"
      onPress={toggleTheme}
    >
      <ButtonIcon
        as={(props: any) => (
          <FontAwesome6 name={theme === 'dark' ? 'sun' : 'moon'} {...props} />
        )}
      />
    </Button>
  );
};

export default ToggleTheme;
