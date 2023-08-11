import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";
import { Users } from "@prisma/client";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { ConfigService } from "@nestjs/config";
import { comparePassword } from "../utils/password";
import { ProfileService } from "../profile/profile.service";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
    private profileService: ProfileService
  ) {
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.issueToken(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens
    };
  }

  async getNewTokens(dto: RefreshTokenDto) {
    const result = await this.jwtService.verifyAsync(dto.refreshToken);

    if (!result) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const user = await this.userService.byParam("id", result.id);

    const tokens = await this.issueToken(user.id);

    return {
      user: this.returnUserFields(user as any),
      ...tokens
    };
  }


  async register(dto: RegisterDto) {

    const user = await this.userService.createUsers(dto)

    const profileId = await this.profileService.createProfile(user.id);

    await this.userService.updateUser({id: user.id, dto: {activeProfileId: profileId}})

    const tokens = await this.issueToken(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens
    };
  }

  private async issueToken(userId: number) {
    const data = { id: userId };

    const accessToken = this.jwtService.sign(
      data, {
        expiresIn: "1h"
      }
    );

    const refreshToken = this.jwtService.sign(
      data, {
        expiresIn: "7d"
      }
    );

    return {
      accessToken,
      refreshToken
    };
  }

  private returnUserFields(user: Partial<Users>) {
    return {
      id: user.id,
      email: user.email
    };
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userService.byParam("email", dto.email, { password: true });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isValid = await comparePassword(user.password, dto.password);


    if (!isValid) {
      throw new UnauthorizedException("Invalid login or password");
    }

    return user;
  }
}
