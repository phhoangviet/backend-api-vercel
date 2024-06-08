import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './users.service';
import { MeetingService } from './meetings.service';
import { Meetings, User } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly meeting: MeetingService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('meeting')
  async createMeeting(@Body() postData: Meetings): Promise<Meetings> {
    return this.meeting.createPost(postData);
  }

  @Post('user')
  async signupUser(@Body() userData: User): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Get('users')
  async getUsers(
    @Param('offset') offset: number,
    @Param('limit') limit: number,
  ): Promise<{ users: User[]; total: number }> {
    return this.userService.users({
      skip: offset,
      take: limit,
    });
  }
}
