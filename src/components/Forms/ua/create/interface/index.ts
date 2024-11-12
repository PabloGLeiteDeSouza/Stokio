import { SQLiteDatabase } from "expo-sqlite";

export interface IFormCreateUa {
    db: SQLiteDatabase;
    onSubimited: () => Promise<void> | void;
}