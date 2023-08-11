import { Prisma } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";

export class UpdateProfileDto implements Prisma.ProfilesUpdateInput {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}