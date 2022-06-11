import { CoreEntity } from './../../common/entites/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column()
  @Field((type) => String)
  password: string;

  @Column()
  @Field((type) => String)
  regison: string;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  avatar: string;

  @Column({ default: false })
  @Field((type) => Boolean, { defaultValue: false })
  socialOnly: boolean;

  @BeforeInsert()
  async hashPassword(aPassword: string): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
