import {
  CadastrarRamoScreenNavigationProp,
  CadastrarRamoScreenRouterProp,
  AtualizarRamoScreenNavigationProp,
  AtualizarRamoScreenRouterProp,
  VisualisarRamoScreenNavigationProp,
  VisualisarRamoScreenRouterProp,
} from '@/types/screens/ramo';

export interface CadastrarRamoScreen {
  navigation?: CadastrarRamoScreenNavigationProp;
  route?: CadastrarRamoScreenRouterProp;
}

export interface AtualizarRamoScreen {
  navigation?: AtualizarRamoScreenNavigationProp;
  route?: AtualizarRamoScreenRouterProp;
}

export interface VisualizarRamoScreen {
  navigation?: VisualisarRamoScreenNavigationProp;
  route?: VisualisarRamoScreenRouterProp;
}
