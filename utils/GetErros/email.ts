import { UpdateEmailDto } from '$classes/email/dto/update-email.dto';
import { FormikErrors } from 'formik';

const getEmailError = (
  errors: FormikErrors<{ emails: UpdateEmailDto[] }>,
  i: number,
): string | null => {
  const telefoneError = errors.emails?.[i];

  if (
    telefoneError &&
    typeof telefoneError !== 'string' &&
    typeof telefoneError.email === 'string'
  ) {
    return telefoneError.email;
  }

  return null;
};

export default getEmailError;
