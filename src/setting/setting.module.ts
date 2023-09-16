import { Logger, Module } from "@nestjs/common";
import { SettingService } from './setting.service';
import { PrismaService } from "../prisma.service";
import { UserService } from "../user/user.service";

@Module({
  providers: [SettingService, PrismaService, Logger],
  imports: [],
  exports: []
})
export class SettingModule {}
