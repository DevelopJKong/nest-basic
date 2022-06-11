import { CreateAccountInput } from './dto/create-account.dto';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    regison,
    avatar,
    socialOnly,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return { ok: false, error: 'There is a user with that email' };
      }
      await this.users.save(
        this.users.create({ email, password, regison, avatar, socialOnly }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Couldn't create account",
      };
    }
  }
}
