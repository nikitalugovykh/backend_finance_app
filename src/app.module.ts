import { Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config"
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from "./prisma.service";
import { PortfolioController } from './portfolio/portfolio.controller';
import { PortfolioModule } from './portfolio/portfolio.module';
import { UserController } from "./user/user.controller";
import { PortfolioService } from "./portfolio/portfolio.service";
import { UserService } from "./user/user.service";
import { SettingModule } from "./setting/setting.module";
import { SettingService } from "./setting/setting.service";

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    },),
    PortfolioModule,
    SettingModule,
  ],
  controllers: [AppController, PortfolioController, UserController],
  providers: [AppService, PrismaService, PortfolioService, UserService, SettingService],
})
export class AppModule {}
