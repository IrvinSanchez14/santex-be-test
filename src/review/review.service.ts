import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService){
  }

  async create(createReviewDto: CreateReviewDto) {
    const { movie } = createReviewDto
    const isMovie = await this.prisma.movies.findUnique({
      where: {
        tmdbId: movie
      }
    })

    if(!isMovie){
      const request = await fetch(`${process.env.API_URL}/${createReviewDto.movie}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
      }).then((res) => res.json())
      await this.prisma.movies.create({
        data: {
          title: request.title,
          tmdbId: createReviewDto.movie,
          release_date: request.release_date,
          poster_path: request.poster_path,
          overview: request.overview,
        }
      })
    }
    return this.prisma.reviews.create({ data: {
      raiting: createReviewDto.raiting,
      movie: {
        connect: {
          tmdbId: createReviewDto.movie,
        }
      },
      author: {
        connect: {
          name: createReviewDto.author
        }
      }
    } })
  }
}

