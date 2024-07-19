import { UpdateEmailDto } from '$classes/email/dto/update-email.dto';
import { UpdateEmpresaDto } from '$classes/empresa/dto/update-empresa.dto';
import { UpdateEnderecoDto } from '$classes/endereco/dto/update-endereco.dto';
import { UpdateTelefoneDto } from '$classes/telefone/dto/update-telefone.dto';

type EditarEmpresasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'editar-empresas'
>;
type EditarEmpresasScreenRouteProp = RouteProp<
  RootStackParamList,
  'editar-empresas'
>;
export interface FormUpdateEmpresasScreenProps {
  navigation?: EditarEmpresasScreenNavigationProp;
  isLoading?: boolean;
  onLoading?: () => Promisse<void>;
  route?: EditarEmpresasScreenRouteProp;
  onSucess: () => Promisse<void>;
  onFail: (error: Error) => Promisse<void>;
  data: UpdateEmpresaDto &
    UpdateEnderecoDto & {
      tipo_empresa: 'pj' | 'pf';
      emails: Array<UpdateEmailDto>;
      telefones: Array<UpdateTelefoneDto>;
    };
}
