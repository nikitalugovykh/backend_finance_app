import { Body, Controller, Get, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth } from "../auth/decorators/auth.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Controller('user')
export class UserController {

  constructor(private UserService: UserService) {
  }

  @Get(':id')
  @Auth()
  @HttpCode(HttpStatus.OK)
  async getUser(@CurrentUser("id") id: number) {
    return this.UserService.byParam('id', id)
  }

  @UsePipes(new ValidationPipe())
  @Post(':id')
  @Auth()
  @HttpCode(HttpStatus.OK)
  async updateUser(@CurrentUser("id") id: number, @Body() dto: UpdateUserDto) {
    return this.UserService.updateUser({id, dto})
  }
}
