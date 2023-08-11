import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { ProfileDto } from "./dto/profile.dto";
import { Profiles, Users } from "@prisma/client";
import { UserRoles } from "../@types/user";

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    ) {}


  async getProfile(profileId: Profiles["id"]) {
    const profile = await this.prisma.profiles.findUnique({
      where: {id: profileId}
    })

    return profile
  }

  async createProfile(id: Users["id"], name: string = 'Main') {
    const profile =  await this.prisma.profiles.create({
      data: {
        name,
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
