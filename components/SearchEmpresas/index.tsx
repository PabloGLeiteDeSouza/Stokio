import { InputField } from '@gluestack-ui/themed';
import { ISearchEmpresas } from './interfaces';
import { mask } from 'react-native-mask-text';

const SearchEmpresas: React.FC<ISearchEmpresas> = ({
  tipo,
  onChangeValue,
  value,
}) => {
  return (
    <>
      {tipo === 'nome_fantasia' || tipo === 'razao_social' ? (
        <InputField onChangeText={onChangeValue} type="text" value="" />
      ) : tipo === 'cpf' ? (
        <InputField
          onChangeText={(text) => {
            onChangeValue(mask(text, '999.999.999-99'));
          }}
          type="text"
          value={value}
          keyboardType="number-pad"
        />
      ) : tipo === 'cnpj' ? (
        <>
          <InputField
            onChangeText={(text) => {
              onChangeValue(mask(text, '99.999.999/9999-99'));
            }}
            type="text"
            value={value}
            keyboardType="number-pad"
          />
        </>
      ) : (
        <InputField />
      )}
    </>
  );
};

export default SearchEmpresas;
