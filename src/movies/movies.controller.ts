import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get(':tmdbId/reviews')
  findAll(
    @Param('tmdbId') tmdbId: string
  ) {
    return this.moviesService.findAll(+tmdbId);
  }
}
