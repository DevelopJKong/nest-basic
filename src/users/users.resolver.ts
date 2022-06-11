import { User } from './entities/user.entity';
import { Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';

@Resolver((of) => User)
export class UserResolver {
  @Query((returns) => Boolean)
  hi() {
    return true;
  }
}
