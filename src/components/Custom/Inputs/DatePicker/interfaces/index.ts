import { AndroidNativeProps } from '@react-native-community/datetimepicker';
import { FormikErrors } from 'formik';

export interface IInputDatePicker extends Omit<AndroidNativeProps, 'onChange'> {
  title: string;
  error?: FormikErrors<Date>;
  value?: Date;
  onChangeDate: (value: Date) => void;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | undefined;
}
