import { IsEmail, IsString, MinLength, IsNumber } from "class-validator";
import { Prisma } from "@prisma/client";

export class RegisterDto implements Omit<Prisma.UsersCreateInput, 'active_profile'> {
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