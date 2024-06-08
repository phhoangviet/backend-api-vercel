import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient, User, Meetings } from '@prisma/client';
import * as fs from 'fs';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
      const userDataSeed = new Promise<User[]>((resolve) => {
        fs.readFile('./seeds/users.json', 'utf8', function (err, data) {
          if (err) throw err;
          const obj: User[] = JSON.parse(data);
          resolve(obj);
        });
      }).then((_res) => _res);
      const MeetingsDataSeed = new Promise<Meetings[]>((resolve) => {
        fs.readFile('./seeds/meetings.json', 'utf8', function (err, data) {
          if (err) throw err;
          const obj: Meetings[] = JSON.parse(data);
          resolve(obj);
        });
      }).then((_res) => _res);
      const resUser = await userDataSeed;
      const resMeetings = await MeetingsDataSeed;

      resUser.forEach(async (user) => {
        const findUser = await this.user.findUnique({
          where: {
            id: user.id,
          },
        });
        if (!findUser) {
          const listMeeting = resMeetings.filter(
            (el) => el.user_id === user.id,
          );

          await this.user.create({
            data: {
              ...user,
            },
          });

          await this.meetings.createMany({
            data: listMeeting,
          });
        }
      });
    } catch (error) {
      Logger.error(`[Init database and seed]: ${error}`);
    }
  }
}
