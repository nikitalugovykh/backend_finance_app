import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { PrismaService } from "../prisma.service";

@Module({
  providers: [ProfileService, PrismaService]
})
export class ProfileModule {}
