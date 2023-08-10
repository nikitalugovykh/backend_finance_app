import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { ProfileDto } from "./dto/profile.dto";
import { Profiles, Users } from "@prisma/client";
import { UserService } from "../user/user.service";

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
    ) {}

  async createProfile(id: Users["id"], name: string = 'Main') {
    const profile =  await this.prisma.profiles.create({
      data: {
        name,
        users: {
          create: [
            {
              role: 'CREATOR',
              user: {
                connect: {id: id}
              }
            }
          ]
        }
      }
    })

    if(profile) {
      return profile.id
    }
  }

  async updateProfile(profileId: Profiles["id"], profileDto: ProfileDto){
    const profile = await this.prisma.profiles.update({
      where: {id: profileId},
      data: profileDto
    })

    return profile
  }

  async deleteProfile(){
    // const isPermitted = await
  }

  async inviteToProfile(){

  }

}
