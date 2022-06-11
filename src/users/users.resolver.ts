import { UserService } from './users.service';
import {
  CreateAccountOutput,
  CreateAccountInput,
} from './dto/create-account.dto';
import { User } from './entities/user.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => Boolean)
  hi() {
    return true;
  }

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const { ok, error } = await this.userService.createAccount(
        createAccountInput,
      );
      if (error) {
        return {
          ok: false,
          error,
        };
      }
      return {
        ok: true,
      };
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }
}
