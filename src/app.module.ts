import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config"
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from "./prisma.service";
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    },),
    ProfileModule
  ],
  controllers: [AppController, ProfileController],
  providers: [AppService,
    PrismaService],
})
export class AppModule {}
