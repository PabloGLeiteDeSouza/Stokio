import { UpdateUnidadeDeArmazenamentoDto } from '$classes/ua/dto/update-ua.dto';
import { ParamListBase, RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  'cadastrar-produtos'?: { code?: string; result?: boolean };
  'code-scanner'?: { screen: string; type: string };
  'listar-produtos'?: { code?: string; result?: boolean };
  'listar-empresas'?: {};
  'listar-ua'?: {};
  'listar-clientes'?: {};
  'cadastrar-clientes'?: {};
  'cadastrar-empresas'?: {};
  'cadastrar-ua'?: {};
  'editar-produtos'?: {};
  'editar-empresas'?: { empresa: UpdateEmpresaObject };
  'editar-ua'?: {};
  'tab-bottom'?: {};
  'auth-screen'?: {};
};

export type UpdateEmpresaObject = {
  id: number;
  id_endereco: number;
  nome_completo?: string;
  data_de_nascimento?: string;
  cpf?: string;
  nome_fantasia?: string;
  razao_social?: string;
  cnpj?: string;
};

export type ScreensScanCode = 'cadastrar-produtos' | 'listar-produtos';

export type ScreenComponentType<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList,
> =
  | React.ComponentType<{
      route: RouteProp<ParamList, RouteName>;
      navigation: any;
    }>
  | React.ComponentType<{}>;

export type TypeUpdateEmpresasObjectToScreen = {
  
}