import { UpdateCategoriaDto } from '$classes/categoria/dto/update-categoria.dto';
import { UpdateClienteDto } from '$classes/cliente/dto/update-cliente.dto';
import { EmpresaCreateData } from '$classes/empresa/types';
import { UpdateRamoDto } from '$classes/ramo/dto/update-ramo.dto';
import { UpdateTipoDeProdutoDto } from '$classes/tipo_produto/dto/update-tipo-de-produto.dto';
import { UpdateUmDto } from '$classes/um/dto/update-um.dto';
import { ClientesObject } from '$screens/Clientes/types';
import { ParamListBase, RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  'screens-produtos'?: object;
  'screens-tipos-produtos'?: object;
  'screens-categorias'?: object;
  'screens-empresas'?: object;
  'screens-marcas'?: object;
  'screens-uas'?: object;
  'screens-ums'?: object;
  'screens-vendas'?: object;
  'screens-tipos-uas'?: object;
  'screens-ramos'?: object;
  'item-venda-screens'?: object;
  'cadastrar-produtos'?: { code?: string; result?: boolean };
  'code-scanner'?: { screen: string; type: string };
  'listar-produtos'?: { code?: string };
  'listar-empresas'?: object;
  'listar-ua'?: object;
  'listar-tipo-ua'?: object;
  'listar-um'?: object;
  'listar-categoria'?: object;
  'listar-tipo-produto'?: object;
  'listar-marca'?: object;
  'listar-vendas'?: object;
  'listar-clientes'?: object;
  'listar-ramos'?: object;
  'listar-venda'?: object;
  'listar-item-venda'?: object;
  'cadastrar-clientes'?: { nome?: string };
  'cadastrar-empresas'?: object;
  'cadastrar-categoria'?: object;
  'cadastrar-marca'?: object;
  'cadastrar-tipo-produto'?: object;
  'cadastrar-ua'?: object;
  'cadastrar-tipo-ua'?: object;
  'cadastrar-um'?: object;
  'cadastrar-ramo'?: object;
  'cadastrar-venda'?: object;
  'cadastrar-item-venda'?: object;
  'editar-produtos'?: object;
  'editar-empresas'?: { empresa: EmpresaCreateData };
  'editar-ua'?: object;
  'editar-um'?: { um: UpdateUmDto };
  'editar-categoria'?: { categoria: UpdateCategoriaDto };
  'editar-marca'?: object;
  'editar-tipo-produto'?: { tipo_de_produto: UpdateTipoDeProdutoDto };
  'editar-tipo-ua'?: object;
  'editar-ramo'?: { ramo: UpdateRamoDto };
  'editar-clientes'?: { cliente: ClientesObject };
  'editar-venda'?: object;
  'editar-venda-item'?: object;
  'tab-bottom'?: object;
  'auth-screen'?: object;
  configuracoes?: object;
};

export type ScreensScanCode = 'cadastrar-produtos' | 'listar-produtos';

export type ScreenComponentType<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList,
> =
  | React.ComponentType<{
      route: RouteProp<ParamList, RouteName>;
      navigation: unknown;
    }>
  | React.ComponentType<object>;

export type TypeUpdateEmpresasObjectToScreen = object;
