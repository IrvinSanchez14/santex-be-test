import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, PrismaService],
  imports: [PrismaModule],
})
export class MoviesModule {}
