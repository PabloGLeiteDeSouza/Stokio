import { CreateEmailDto } from './create-email.dto';

export class UpdateEmailDto extends CreateEmailDto {
  id: number;

  constructor(id: number, email: string, id_pessoa: number) {
    super(email, id_pessoa);
    this.id = id;
  }
}
