import { TipoUaUpdate } from "@/classes/tipo_ua/interfaces";
import { SQLiteDatabase } from "expo-sqlite";

export interface IFormCreateUa {
    db: SQLiteDatabase;
    onSubimited: () => Promise<void> | void;
    haveTipoUa: boolean;
    onChangeTipoUa: (tipo_ua: TipoUaUpdate) => Promise<void> | void;
    tipo_ua?: TipoUaUpdate | undefined;
}