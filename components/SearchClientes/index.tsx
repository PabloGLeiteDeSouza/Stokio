import { Switch, HStack } from '@gluestack-ui/themed';

import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Input,
  InputField,
  Button,
  Box,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  AlertCircleIcon,
  ChevronDownIcon,
  SearchIcon,
  ButtonIcon,
} from '@gluestack-ui/themed';
import { mask } from 'react-native-mask-text';
import { SearchClientesProps } from './interface';
import { Pessoa } from '$classes/pessoa';
import { Telefone } from '$classes/telefone';
import { Email } from '$classes/email';
import { Cliente } from '$classes/cliente';
import { Endereco } from '$classes/endereco';
import { Text } from '@gluestack-ui/themed';
import { Alert } from 'react-native';
const SearchClientes: React.FC<SearchClientesProps> = ({
  db,
  onSearchValues,
  setIsStartingPage,
}) => {
  const [value, setValue] = React.useState('');
  const [tipoDeBusca, setTipoDeBusca] = React.useState<
    'nome_completo' | 'cpf' | string
  >('');
  const [messageErrors, setMessageErros] = React.useState('');
  const [isEnabled, setIsEnabled] = React.useState(true);

  const onSearch = async () => {
    try {
      if (tipoDeBusca === 'nome_completo') {
        const pss = await new Pessoa(db).findAllByNome(value);
        const data = await Promise.all(
          pss.map(async (p) => {
            const cliente = await new Cliente(db).findByIdPessoa(
              p.id,
              isEnabled,
            );
            const endereco = await new Endereco(db).findUniqueByIdPessoa(p.id);
            const telefones = await new Telefone(db).findByIdPessoa(p.id);
            const emails = await new Email(db).findAllByIdPessoa(p.id);
            return {
              ...p,
              ...cliente,
              endereco,
              telefones,
              emails,
            };
          }),
        );
        onSearchValues(data);
      } else if (tipoDeBusca === 'cpf') {
        const pss = await new Pessoa(db).findUniqueByCPF(value);
        const cliente = await new Cliente(db).findByIdPessoa(pss.id, isEnabled);
        const endereco = await new Endereco(db).findUniqueByIdPessoa(pss.id);
        const telefones = await new Telefone(db).findByIdPessoa(pss.id);
        const emails = await new Email(db).findAllByIdPessoa(pss.id);
        const data = {
          ...pss,
          ...cliente,
          endereco,
          telefones,
          emails,
        };
        onSearchValues([data]);
      } else {
        const cli = await new Cliente(db).findAll(isEnabled);
        const data = await Promise.all(
          cli.map(async (c) => {
            const pessoa = await new Pessoa(db).findById(c.id_pessoa);
            const endereco = await new Endereco(db).findUniqueByIdPessoa(
              c.id_pessoa,
            );
            const telefones = await new Telefone(db).findByIdPessoa(
              c.id_pessoa,
            );
            const emails = await new Email(db).findAllByIdPessoa(c.id_pessoa);
            return {
              ...pessoa,
              ...c,
              endereco,
              telefones,
              emails,
            };
          }),
        );
        if (data.length < 1) {
          throw new Error('Nao foram econtrados registros!');
        }
        if (messageErrors) {
          setMessageErros('');
        }
        onSearchValues(data);
      }
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
      setMessageErros((error as Error).message);
      throw error;
    }
  };
  return (
    <Box my="$5">
      <FormControl
        isInvalid={messageErrors ? true : false}
        size={'lg'}
        isDisabled={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Buscar cliente</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            type="text"
            keyboardType={
              tipoDeBusca === 'cpf' ? 'number-pad' : 'ascii-capable'
            }
            value={value}
            onChangeText={(text) => {
              setValue(
                tipoDeBusca === 'cpf' ? mask(text, '999.999.999-99') : text,
              );
            }}
          />
          <Select
            isInvalid={messageErrors ? true : false}
            isDisabled={false}
            onValueChange={(value) => setTipoDeBusca(value)}
            initialLabel="Selecione uma opcao"
            defaultValue="-"
          >
            <SelectTrigger size={'lg'} variant={'outline'}>
              <SelectInput placeholder="Select option" />
              <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem
                  label="Nome Completo"
                  value="nome_completo"
                  isPressed={tipoDeBusca === 'nome_completo'}
                />
                <SelectItem
                  label="CPF"
                  value="cpf"
                  isPressed={tipoDeBusca === 'cpf'}
                />
              </SelectContent>
            </SelectPortal>
          </Select>

          <Button
            onPress={() => {
              setIsStartingPage(true);
              setTimeout(() => onSearch(), 1);
              setIsStartingPage(false);
            }}
          >
            <ButtonIcon as={SearchIcon} />
          </Button>
        </Input>

        <FormControlHelper>
          <FormControlHelperText>
            {tipoDeBusca === 'cpf'
              ? 'Informe seu cpf'
              : 'Informe seu nome completo'}
          </FormControlHelperText>
        </FormControlHelper>

        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{messageErrors}</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <HStack space="md" alignItems="center" my="$2">
        <Switch
          defaultValue={isEnabled}
          value={isEnabled}
          size={'lg'}
          isDisabled={false}
          isInvalid={false}
          onValueChange={(vl) => setIsEnabled(vl)}
        />
        <Text>{isEnabled ? 'Ativo' : 'Inativo'}</Text>
      </HStack>
      <Box mt="$2">
        <Text>
          Para adicionar mais clientes adicione clicando no botao + abaixo:
        </Text>
      </Box>
    </Box>
  );
};
export default SearchClientes;
