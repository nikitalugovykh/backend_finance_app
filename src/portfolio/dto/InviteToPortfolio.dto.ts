import { IsEmail, IsNumber } from "class-validator";

export class InviteToPortfolioDto {
  @IsEmail()
  email: string

  @IsNumber()
  portfolioId: number


}