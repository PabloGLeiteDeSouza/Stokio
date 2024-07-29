import { UpdateUnidadeDeArmazenamentoDto } from '$classes/ua/dto/update-ua.dto';

export interface BuscarUaProps {
  value: string;
  onChangeValue: (text: string) => void;
  tipo: 'nome' | 'tipo_ua';
  itens?: Array<UpdateUnidadeDeArmazenamentoDto>;
}
