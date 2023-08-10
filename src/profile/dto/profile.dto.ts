import { IsString } from "class-validator";
import { Prisma } from "@prisma/client";

export class ProfileDto implements Prisma.ProfileCreateInput {
  @IsString()
  name: string;
}