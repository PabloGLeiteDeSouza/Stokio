import { FormikHelpers } from 'formik';

type Values = {
  nome: string;
  descricao: string;
};

export async function criarTipo(
  values: Values,
  formikHelpers: FormikHelpers<Values>,
): Promise<void> {}
