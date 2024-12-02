import { Button } from '@gluestack-ui/themed';
import { ButtonDeleteProps } from './interfaces';
import { ButtonText, TrashIcon, ButtonIcon } from '@gluestack-ui/themed';
import { Alert, GestureResponderEvent } from 'react-native';
import React from 'react';

const ButtonDelete: React.FC<ButtonDeleteProps> = ({
  delete_message,
  isMinified,
  onPress,
}) => {
  const minified = typeof isMinified !== 'undefined' ? isMinified : false;

  const onDelete = (event: GestureResponderEvent) => {
    Alert.alert('Aviso', delete_message, [
      {
        text: 'calcelar',
        onPress() {
          Alert.alert('Aviso', 'Operacao cancelada!');
        },
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: () => {
          if (onPress) {
            onPress(event);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <Button action="negative" gap={minified ? '$0' : '$5'} onPress={onDelete}>
      {minified ? (
        <>
          <ButtonIcon as={TrashIcon} />
        </>
      ) : (
        <>
          <ButtonText>Deletar</ButtonText>
          <ButtonIcon as={TrashIcon} />
        </>
      )}
    </Button>
  );
};

export default ButtonDelete;
