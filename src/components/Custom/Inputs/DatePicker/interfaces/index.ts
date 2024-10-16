import { FormikErrors } from 'formik';

export interface IInputDatePicker {
  title: string;
  error?: FormikErrors<Date>;
  value: Date;
  onChangeDate: (value: string) => void;
  maximumDate?: Date;
}
