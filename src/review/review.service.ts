import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService){
  }

  create(createReviewDto: CreateReviewDto) {
    return this.prisma.reviews.create({ data: {
      raiting: createReviewDto.raiting,
      movie: {
        connect: {
          tmdbId: createReviewDto.movie,
        }
      },
      author: {
        connect: {
          id: 4,
          name: createReviewDto.author
        }
      }
    } })
  }
}
