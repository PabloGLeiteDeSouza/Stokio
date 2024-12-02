export interface ISelectEstados {
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  value?: string;
  label?: string;
  onChangeValue?: (text: string) => void;
  error?: string;
}
