import { Prisma } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";

export class UpdatePortfolioDto implements Prisma.PortfoliosCreateInput {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}