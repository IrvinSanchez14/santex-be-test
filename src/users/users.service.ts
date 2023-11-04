import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){
  }

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto })
  }

  findAll(userName: string) {
    return this.prisma.user.findMany({
      where: {
        name: userName
      },
      include: {
        Reviews: true
      }
    })
  }
}
