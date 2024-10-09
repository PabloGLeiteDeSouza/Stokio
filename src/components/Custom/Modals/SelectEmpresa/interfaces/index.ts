import { Empresa } from '@/types/screens/empresa';

export interface IModalSelectEmpresaProps {
  onChangeEmpresa: (empresa: Empresa) => void;
}

export interface IItemListEmpresasProps {
  item: Empresa;
  onChangeItem: (item: Empresa) => void;
  selectedEmpresa: Empresa;
}
