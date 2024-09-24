import { UpdateEmailDto } from '$classes/email/dto/update-email.dto';
import { UpdateEnderecoDto } from '$classes/endereco/dto/update-endereco.dto';
import { UpdateTelefoneDto } from '$classes/telefone/dto/update-telefone.dto';
import { RootStackParamList } from '$types/index';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type ListarClientesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'listar-marca'
>;
export type ListarClientesScreenRouteProp = RouteProp<
  RootStackParamList,
  'listar-marca'
>;
export type CadastrarClientesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-marca'
>;
export type CadastrarClientesScreenRouteProp = RouteProp<
  RootStackParamList,
  'cadastrar-marca'
>;

export type AtualizarClientesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'editar-marca'
>;
export type AtualizarClientesScreenRouteProp = RouteProp<
  RootStackParamList,
  'editar-marca'
>;

export type ClientesObject = {
  endereco: UpdateEnderecoDto;
  telefones: UpdateTelefoneDto[];
  emails: UpdateEmailDto[];
  id: number;
  id_pessoa: number;
  limite: number;
  status: boolean;
  nome: string;
  data_de_nascimento: Date;
  cpf: string;
};