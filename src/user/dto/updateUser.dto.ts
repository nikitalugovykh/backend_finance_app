import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";
import { Prisma } from "@prisma/client";

export class UpdateUserDto implements Prisma.UsersUpdateInput {
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  firstname?: string

  @IsOptional()
  @IsString()
  lastname?: string

  @IsOptional()
  @IsString()
  avatarPath?: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsNumber()
  activeProfileId?: number
}