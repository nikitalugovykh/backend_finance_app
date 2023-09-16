import { IsOptional, IsString } from "class-validator";
import { Prisma } from "@prisma/client";

export class PortfolioDto implements Prisma.PortfoliosCreateInput {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}