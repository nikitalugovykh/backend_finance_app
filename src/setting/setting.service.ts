import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Users } from "@prisma/client";
import { SettingKey, SettingType } from "./types";

@Injectable()
export class SettingService {
  constructor(
    private prismaService: PrismaService
  ) {}


  async setParams(id: Users['id'], param: Partial<SettingType>) {
    const params = await this.prismaService.userSettings.createMany({
      data: Object.entries(param).map(([key, value]) => ({key, value, userId: id}))
    })

    return params
  }

  async getParam(id: Users['id'], param: SettingKey) {
    const params = await this.prismaService.userSettings.findMany({
      where: {
        id: id,
        key: param
      }
    })

    if(params.length  > 1) {
      Logger.error(`More than one ${param} found for user ${id}`)
    }

    return params[0]
  }

}
