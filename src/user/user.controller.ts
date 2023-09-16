import {
  BadRequestException,
  Body,
  Controller,
  Delete, ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth } from "../auth/decorators/auth.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get(':id')
  @Auth()
  @HttpCode(HttpStatus.OK)
  async getUser(@CurrentUser("id") id: number) {
    return this.userService.byParam('id', id)
  }

  @UsePipes(new ValidationPipe())
  @Post(':id')
  @Auth()
  @HttpCode(HttpStatus.OK)
  async updateUser(@CurrentUser("id") id: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser({id, dto})
  }

  @Delete()
  @Auth()
  @HttpCode(HttpStatus.OK)
  async deleteUser(@CurrentUser('id') currentUser: number) {
    return this.userService.deleteUser(currentUser)
  }
}
