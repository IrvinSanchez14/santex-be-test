import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){
  }

  async create(createUserDto: CreateUserDto) {
    const { name } = createUserDto
    const existingUser = await this.prisma.user.findUnique({
      where: {
        name
      }
    })

    if(existingUser){
      throw new HttpException('this user name exist in the database', HttpStatus.BAD_REQUEST)
    }

    return this.prisma.user.create({ data: createUserDto })
  }

  async findAll(userName: string) {
    const response = await this.prisma.user.findMany({
      where: {
        name: userName
      },
      include: {
        Reviews: true
      }
    })

    if(response.length === 0){
      throw new HttpException('this user has not made any reviews', HttpStatus.BAD_REQUEST)
    }

    return response
  }
}
