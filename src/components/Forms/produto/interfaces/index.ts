import { TipoProduto } from "@/classes/produto/interfaces";
import { Empresa } from "@/types/screens/empresa";
import { Marca } from "@/types/screens/marca";
import { Ua } from "@/types/screens/ua";
import { Um } from "@/types/screens/um";
import { SQLiteDatabase } from "expo-sqlite";

export interface IFormCreateProduto {
    db: SQLiteDatabase;
    onRedirectProductExists: () => Promise<void> | void;
    onSelectMarca: (marca: Marca) => Promise<void> | void;
    haveMarcas: boolean
    marca?: Marca;
    onSelectEmpresa: (empresa: Empresa) => Promise<void> | void;
    onCreateEmpresa: () => Promise<void> | void;
    haveEmpresas: boolean;
    empresa?: Empresa;
    onSelectTipoProduto: (tipo_produto: TipoProduto) => Promise<void> | void;
    haveTiposProdutos: boolean;
    tipo_produto?: TipoProduto;
    onCreateUa: () => Promise<void> | void;
    onSelectUa: (ua: Ua) => Promise<void> | void;
    haveUas: boolean;
    ua?: Ua;
    onSelectUm: (um: Um) => Promise<void> | void;
    haveUms: boolean;
    um?: Um;
    onCodeScanner: () => Promise<void> | void;
    code?: string;
    onCreatedProduto: () => Promise<void> | void;
}