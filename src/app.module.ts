import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserService } from './users.service';
import { MeetingService } from './meetings.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [AppController],

  providers: [AppService, UserService, MeetingService, PrismaService],
})
export class AppModule {}
