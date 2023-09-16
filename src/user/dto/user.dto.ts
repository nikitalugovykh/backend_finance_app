import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";
import { Prisma } from "@prisma/client";


export class UserDto implements Prisma.UsersCreateInput {
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsString()
  firstname: string

  @IsString()
  lastname: string

  @IsOptional()
  @IsString()
  avatarPath?: string

  @IsString()
  phone: string
}