import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService){
  }

  async create(createMovieDto: CreateMovieDto) {
    const { tmdbId } = createMovieDto
    const existingMovie = await this.prisma.movies.findUnique({
      where: {
        tmdbId
      }
    })

    if(existingMovie){
      throw new HttpException('this movie exist in the database', HttpStatus.BAD_REQUEST)
    }
    return this.prisma.movies.create({ data: createMovieDto})
  }

  async findAll(tmdbId: number) {
    const response = await this.prisma.movies.findMany({
      where: {
        tmdbId,
      },
      include: {
        Reviews: true
      }
    })

    if(response.length === 0){
      throw new HttpException('this movie has not reviews', HttpStatus.BAD_REQUEST)
    }

    return response
  }
}
