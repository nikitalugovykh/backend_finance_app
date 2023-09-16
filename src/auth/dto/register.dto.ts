import { IsEmail, IsString, MinLength } from "class-validator";
import { Prisma } from "@prisma/client";

export class RegisterDto implements Prisma.UsersCreateInput {
  @IsEmail()
  email: string
  
  @MinLength(6, {
    message: "Password must be at least 6 characters long",
  })
  @IsString()
  password: string

  @IsString()
  firstname: string

  @IsString()
  lastname: string

  @IsString()
  phone: string
}