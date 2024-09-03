import { HStack } from '@gluestack-ui/themed';
import { CardProps } from './interfaces';
import { CardCustonColorsBg } from '$constants/styles/cards';

const CardCustom: React.FC<CardProps> = ({ variant, ...props }) => {
  return (
    <HStack
      m="$2.5"
      {...props}
      p="$5"
      rounded={'$md'}
      $light-bgColor={
        variant === 'primary'
          ? CardCustonColorsBg.primary_light
          : variant === 'secondary'
            ? CardCustonColorsBg.secondary_light
            : variant === 'success'
              ? CardCustonColorsBg.success_light
              : variant === 'warning'
                ? CardCustonColorsBg.warn_light
                : variant === 'danger'
                  ? CardCustonColorsBg.danger_light
                  : CardCustonColorsBg.primary_light
      }
      $dark-bgColor={
        variant === 'primary'
          ? CardCustonColorsBg.primary_dark
          : variant === 'secondary'
            ? CardCustonColorsBg.secondary_dark
            : variant === 'success'
              ? CardCustonColorsBg.success_dark
              : variant === 'warning'
                ? CardCustonColorsBg.warn_dark
                : variant === 'danger'
                  ? CardCustonColorsBg.danger_dark
                  : CardCustonColorsBg.primary_dark
      }
      gap="$5"
    />
  );
};

export default CardCustom;
