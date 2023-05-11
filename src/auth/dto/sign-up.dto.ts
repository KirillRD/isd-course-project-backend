import { IsNotEmpty, Matches, NotContains } from 'class-validator';
import { Exception } from 'src/exceptions';

export class SignUpDto {
  @Matches(
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    { message: Exception.USER_EMAIL_FORMAT },
  )
  email: string;

  @IsNotEmpty({ message: Exception.USER_PASSWORD_IS_EMPTY })
  @NotContains(' ', { message: Exception.USER_PASSWORD_CONTAINS_SPACES })
  password: string;
  name: string;
}
