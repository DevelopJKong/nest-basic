import { CoreOutput } from './../../common/dto/core-output.dto';
import { User } from './../entities/user.entity';
import { PickType } from '@nestjs/graphql';

export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'regison',
  'avatar',
  'socialOnly',
]) {}


export class CreateAccountOutput extends CoreOutput {}