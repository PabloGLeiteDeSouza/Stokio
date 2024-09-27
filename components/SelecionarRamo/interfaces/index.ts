/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateRamoDto } from '$classes/ramo/dto/update-ramo.dto';
import { SQLiteDatabase } from 'expo-sqlite';
import { FormikErrors } from 'formik';

export interface SelecionarRamoProps {
  db: SQLiteDatabase;
  onChangeRamo: (value: UpdateRamoDto) => void | Promise<void>;
  handleChange: {
    /** Classic React change handler, keyed by input name */
    (e: React.ChangeEvent<any>): void;
    /** Preact-like linkState. Will return a handleChange function.  */
    <T = string | React.ChangeEvent<any>>(
      field: T,
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  values: {
    ramo: string;
    descricao: string;
  };
  errors: FormikErrors<{
    ramo: string;
    descricao: string;
  }>;
}
