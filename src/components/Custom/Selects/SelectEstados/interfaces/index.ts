export interface ISelectEstados {
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  value?: string;
  label?: string;
  onChangeValue?: (text: string) => void;
  error?: string;
}
