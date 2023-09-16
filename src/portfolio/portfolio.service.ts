import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PortfolioDto } from "./dto/portfolio.dto";
import { Portfolios, Users } from "@prisma/client";
import { UserRoles } from "../user/types/user";
import { InviteToPortfolioDto } from "./dto/InviteToPortfolio.dto";
import { InviteStatus } from "./types/portfolio";

@Injectable()
export class PortfolioService {
  constructor(
    private prisma: PrismaService,
    ) {}


  async getPortfolios(portfolioId: Portfolios["id"]) {
    const portfolio = await this.prisma.portfolios.findUnique({
      where: {id: portfolioId}
    })

    return portfolio
  }

  async createPortfolio(id: Users["id"], data: PortfolioDto = {name: 'Main'}) {
    const portfolio =  await this.prisma.portfolios.create({
      data: {
        ...data,
        users: {
          create: [
            {
              role: UserRoles.Creator,
              user: {
                connect: {id: id}
              }
            }
          ]
        }
      }
    })

    return portfolio
  }

  async updatePortfolio(portfolioId: Portfolios["id"], portfolioDto: PortfolioDto){
    const portfolio = await this.prisma.portfolios.update({
      where: {id: portfolioId},
      data: portfolioDto
    })

    return portfolio
  }

  async deletePortfolio(userId: Users["id"], portfolioId: Portfolios["id"]){
    const portfolios = await this.prisma.portfoliosUsers.findMany({
      where: {
        userId: userId,
        role: UserRoles.Creator
      }
    })

    if(portfolios && portfolios.length === 1) {
      throw new BadRequestException('You can not delete the last portfolio')
    }

    const deletedPortfolio = await this.prisma.portfolios.delete({
      where: {id: portfolioId}
    })

    return deletedPortfolio

  }

  async inviteToPortfolio(userId: Users["id"], dto: InviteToPortfolioDto){
    const portfolio = await this.prisma.portfolios.findUnique({
      where: {id: dto.portfolioId}
    })

    if(!portfolio) {
      throw new BadRequestException('Portfolio not found')
    }

    const invitedUser = await this.prisma.invitationsToPortfolio.create({
      data: {
        email: dto.email,
        portfolio: {
          connect: {id: portfolio.id}
        },
        user: {
          connect: {id: userId}
        },
        status: InviteStatus.Pending
      }
    })

    if(!invitedUser) {
      throw new BadRequestException('Something went wrong')
    }

    return true
  }

  async accessInviteToPortfolio(userId: Users["id"], portfolioId: Portfolios["id"]){
    const userInvitations = await this.prisma.invitationsToPortfolio.findFirstOrThrow({
      where: {
        userId: userId,
        portfolioId
      }
    })

    if(!userInvitations) {
      throw new BadRequestException('Invitation not found')
    }

    await this.prisma.invitationsToPortfolio.update({
      where: {
        id: userInvitations.id,
      },
      data: {
        status: InviteStatus.Accepted
      }
    })

    await this.prisma.portfoliosUsers.create({
      data: {
        portfolioId,
        userId: userId,
        role: UserRoles.Editor
      }
    })

    return true

  }

  async declineInviteToPortfolio(userId: Users["id"], portfolioId: Portfolios["id"]){
    const userInvitations = await this.prisma.invitationsToPortfolio.findFirstOrThrow({
      where: {
        userId: userId,
        portfolioId
      }
    })

    if(!userInvitations) {
      throw new BadRequestException('Invitation not found')
    }

    await this.prisma.invitationsToPortfolio.update({
      where: {
        id: userInvitations.id,
      },
      data: {
        status: InviteStatus.Declined
      }
    })

    return true
  }

}
