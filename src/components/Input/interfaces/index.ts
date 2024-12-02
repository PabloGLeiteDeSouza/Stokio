import {} from '@gluestack-ui/input/src/types';

export interface IInputTextProps {
  
  error?: string;
  value?: string;
  size?: 'sm' | 'md' | 'lg' | undefined;
  isReadOnly?: boolean | undefined;
  isInvalid?: boolean | undefined;
  isDisabled?: boolean | undefined;
  isRequired?: boolean | undefined;
  onChangeValue?: (text: string) => Promise<void> | void;
  onBlur?: () => Promise<void> | void;
  onSubmitedValues?: (text: string) => Promise<void> | void;
  inputType?: 'cpf' | 'cnpj' | 'cep' | 'telefone' | 'money' | 'default';
  customType?: 'search_input' | 'default';
  /**
   * Essa propriedade deve ser informada caso queira ser usada no caso default da prop inputType default
   * ou sem definicao caso seja indefinida seu valor padrao e Nome.
   */
  title?: string;
}
