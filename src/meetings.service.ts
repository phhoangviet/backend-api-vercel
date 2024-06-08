import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Meetings, Prisma } from '@prisma/client';

@Injectable()
export class MeetingService {
  constructor(private prisma: PrismaService) {}

  async post(
    postWhereUniqueInput: Prisma.MeetingsWhereUniqueInput,
  ): Promise<Meetings | null> {
    return this.prisma.meetings.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MeetingsWhereUniqueInput;
    where?: Prisma.MeetingsWhereInput;
    orderBy?: Prisma.MeetingsOrderByWithRelationInput;
  }): Promise<Meetings[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.meetings.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(
    data: Prisma.MeetingsUncheckedCreateInput,
  ): Promise<Meetings> {
    return this.prisma.meetings.create({
      data,
    });
  }

  async updatePost(params: {
    where: Prisma.MeetingsWhereUniqueInput;
    data: Prisma.MeetingsUpdateInput;
  }): Promise<Meetings> {
    const { data, where } = params;
    return this.prisma.meetings.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.MeetingsWhereUniqueInput): Promise<Meetings> {
    return this.prisma.meetings.delete({
      where,
    });
  }
}
