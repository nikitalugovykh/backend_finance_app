import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from "./user.service";
import { PrismaService } from "../prisma.service";
import { ConfigService } from "@nestjs/config";
import { PortfolioService } from "../portfolio/portfolio.service";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, ConfigService, PortfolioService]
})
export class UserModule {}
