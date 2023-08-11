import { IsOptional, IsString } from "class-validator";
import { Prisma } from "@prisma/client";

export class ProfileDto implements Prisma.ProfilesCreateInput {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}