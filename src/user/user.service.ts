import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { returnUserObject } from "./objects/return-user.object"
import { Prisma, Users } from "@prisma/client";
import { UserDto } from "./dto/user.dto"
import { ConfigService } from "@nestjs/config";
import { getHashedPassword } from "../utils/password";
import { RegisterDto } from "../auth/dto/register.dto";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService
  ) {
  }

  async byParam(param: keyof Prisma.UsersWhereUniqueInput, value: any, selectObject?: Prisma.UsersSelect) {
    const user = await this.prisma.users.findUnique({
      where: { [param]: value },
      select: {
        ...returnUserObject,
        ...selectObject,
      },
    })

    if (!user) {
      throw new NotFoundException("User not found")
    }

    return user
  }

  async getUser() {

  }

  async createUsers(dto: RegisterDto) {
    const oldUser = await this.prisma.users.findUnique({
      where: {
        email: dto.email
      }
    });

    if (oldUser) {
      throw new BadRequestException("User already exists");
    }

    const user = await this.prisma.users.create({
      data: {
        ...dto,
        activeProfileId: new Date().getTime(),
        password: await getHashedPassword(dto.password, +this.configService.get('SALT_ROUNDS'))
      }
    });
    
    return user
  }



  async deleteUser() {

  }


  async updateUser({id, dto}:{id: number, dto: Partial<UserDto>}) {
    const user = await this.byParam('id', id, {password: true})

    if (user && id !== user.id) {
      throw new BadRequestException("Email already in use")
    }

    const hashedPassword = dto.password ? await getHashedPassword(dto.password, this.configService.get('SALT_ROUNDS')) : user.password

    return this.prisma.users.update({
      where: { id },
      data: {
        ...dto,
        password: hashedPassword,
      },
    })
  }
}
