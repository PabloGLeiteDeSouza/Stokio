import { CreateEmailDto } from './create-email.dto';

export class UpdateEmailDto extends CreateEmailDto {
  constructor(id: number, email: string, id_empresa: number) {
    super(email, id_empresa, id);
  }
}
