import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { RefreshTokenDto } from "./dto/refresh-token.dto"
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post("register")
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post("login/access-token")
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto)
  }
}
