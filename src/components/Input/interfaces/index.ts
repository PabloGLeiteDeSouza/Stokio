import {} from '@gluestack-ui/input/src/types';

export interface IInputTextProps
  extends React.ForwardRefExoticComponent<
    React.RefAttributes<
      import('@gluestack-style/react/lib/typescript/types').StyledComponentProps<
        import('react-native').StyleProp<import('react-native').TextStyle>,
        unknown,
        import('react-native').TextInputProps,
        'InputField',
        typeof import('react-native').TextInput
      >
    > &
      Omit<
        import('@gluestack-style/react/lib/typescript/types').StyledComponentProps<
          import('react-native').StyleProp<import('react-native').TextStyle>,
          unknown,
          import('react-native').TextInputProps,
          'InputField',
          typeof import('react-native').TextInput
        >,
        'ref'
      > &
      import('@gluestack-ui/input/lib/typescript/types').IInputProps
  > {
  size?: 'sm' | 'md' | 'lg' | undefined;
  isInvalid?: boolean | undefined;
  isDisabled?: boolean | undefined;
  isRequired?: boolean | undefined;
  onChangeValue?: (text: string) => void;
  onSubmitedValues?: (text: string) => Promise<void> | void;
  inputType?: 'cpf' | 'cnpj' | 'cep' | 'telefone' | 'money' | 'default';
  customType?: 'search_input' | 'default';
  /**
   * Essa propriedade deve ser informada caso queira ser usada no caso default da prop inputType default
   * ou sem definicao caso seja indefinida seu valor padrao e Nome.
   */
  title?: string;
}
