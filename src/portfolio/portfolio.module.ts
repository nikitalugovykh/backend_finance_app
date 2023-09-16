import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PrismaService } from "../prisma.service";
import { PortfolioController } from "./portfolio.controller";

@Module({
  providers: [PortfolioService, PrismaService],
  controllers: [PortfolioController]
})
export class PortfolioModule {}
