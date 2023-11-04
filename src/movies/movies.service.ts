import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService){
  }

  create(createMovieDto: CreateMovieDto) {
    return this.prisma.movies.create({ data: createMovieDto})
  }

  findAll(tmdbId: number) {
    return this.prisma.movies.findMany({
      where: {
        tmdbId,
      },
      include: {
        Reviews: true
      }
    })
  }
}
