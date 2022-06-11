import { CoreOutput } from './../../common/dto/core-output.dto';
import { User } from './../entities/user.entity';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'regison',
  'avatar',
  'socialOnly',
]) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}