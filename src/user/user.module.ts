import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from "./user.service";
import { PrismaService } from "../prisma.service";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, ConfigService]
})
export class UserModule {}
