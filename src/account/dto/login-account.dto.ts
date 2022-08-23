import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';

export class LoginAccountDto extends PartialType(CreateAccountDto) {
    email:string
    password:string
}
