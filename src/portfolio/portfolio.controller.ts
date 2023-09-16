import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { PortfolioService } from "./portfolio.service";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { Auth } from "../auth/decorators/auth.decorator";
import { PortfolioDto } from "./dto/portfolio.dto";
import { UpdatePortfolioDto } from "./dto/updatePortfolio.dto";
import { InviteToPortfolioDto } from "./dto/InviteToPortfolio.dto";

@Controller('portfolio')
export class PortfolioController {

  constructor(
    private portfolioService: PortfolioService
  ) {}

  @Get()
  @Auth()
  async getPortfolio(@CurrentUser('id') id: number, ) {
    return await this.portfolioService.getPortfolios(id)
  }

  @Post('create')
  @Auth()
  async createPortfolio(@CurrentUser('id') id: number, @Body() dto: PortfolioDto) {
    return await this.portfolioService.createPortfolio(id, dto)
  }

  @Delete(":id")
  @Auth()
  async deletePortfolio(@CurrentUser('id') id: number, @Param('id') portfolioId: number) {
    return await this.portfolioService.deletePortfolio(id, portfolioId)
  }

  @Post('invite')
  @Auth()
  async inviteToPortfolio(@CurrentUser('id') id: number, @Body() dto: InviteToPortfolioDto) {
    return await this.portfolioService.inviteToPortfolio(id, dto)
  }

  @Post('access-invite/:portfolioId')
  @Auth()
  async accessInviteToPortfolio(@CurrentUser('id') id: number, @Param('portfolioId') portfolioId: number) {
    return await this.portfolioService.accessInviteToPortfolio(id, portfolioId)
  }

  @Post('decline-invite/:portfolioId')
  @Auth()
  async declineInviteToPortfolio(@CurrentUser('id') id: number, @Param('portfolioId') portfolioId: number) {
    return await this.portfolioService.declineInviteToPortfolio(id, portfolioId)
  }

  @UsePipes(new ValidationPipe())
  @Post('update/:id')
  async updatePortfolio(@Param('id') id: number, @Body() dto: UpdatePortfolioDto) {
    return await this.portfolioService.updatePortfolio(+id, dto)
  }
}
