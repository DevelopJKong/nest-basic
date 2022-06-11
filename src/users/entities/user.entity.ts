import { CoreEntity } from './../../common/entites/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { IsEmail, Min } from 'class-validator';
import * as bcrypt from "bcrypt";

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
  @Min(5)
  password: string;

  @Column()
  @Field((type) => String)
  regison: string;

  @Column()
  @Field((type) => String)
  avatar: string;

  @Column()
  @Field((type) => Boolean)
  socialOnly: boolean;

  @BeforeInsert()
  async hashPassword(aPassword: string): Promise<void> {
    try {
      this.password = await bcrypt.hash(aPassword, this.password);
    } catch (error) {}
  }
}
