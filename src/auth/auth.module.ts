import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { getJwtConfig } from "../config/jwt.config";
import { JwtStrategy } from "./jwt.strategy";
import { PrismaService } from "../prisma.service";
import { UserService } from "../user/user.service";
import { PortfolioService } from "../portfolio/portfolio.service";
import { SettingService } from "../setting/setting.service";

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: getJwtConfig,
      inject: [ConfigService],
      imports: [ConfigModule]
    })
  ],
  providers: [AuthService, PrismaService, JwtStrategy, UserService, PortfolioService, SettingService],
  controllers: [AuthController]
})
export class AuthModule {}
