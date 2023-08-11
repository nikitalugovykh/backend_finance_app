import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { Auth } from "../auth/decorators/auth.decorator";
import { ProfileDto } from "./dto/profile.dto";
import { UpdateProfileDto } from "./dto/updateProfile.dto";

@Controller('profile')
export class ProfileController {

  constructor(
    private profileService: ProfileService
  ) {}

  @Get()
  @Auth()
  async getProfile(@CurrentUser('id') id: number) {
    return await this.profileService.getProfile(id)
  }

  @Post('create')
  @Auth()
  async createProfile() {}

  @Delete()
  @Auth()
  async deleteProfile() {}

  @Post('invite')
  @Auth()
  async inviteToProfile() {}

  @UsePipes(new ValidationPipe())
  @Post('update/:id')
  async updateProfile(@Param('id') id: number, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(+id, dto)
  }
}
