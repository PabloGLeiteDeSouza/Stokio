import { UpdateTelefoneDto } from '$classes/telefone/dto/update-telefone.dto';
import { FormikErrors } from 'formik';

const getTelefoneError = (
  errors: FormikErrors<{ telefones: UpdateTelefoneDto[] }>,
  i: number,
): string | null => {
  const telefoneError = errors.telefones?.[i];

  if (
    telefoneError &&
    typeof telefoneError !== 'string' &&
    typeof telefoneError.telefone === 'string'
  ) {
    return telefoneError.telefone;
  }

  return null;
};

export default getTelefoneError;
