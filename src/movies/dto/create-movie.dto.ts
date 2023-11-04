import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieDto {
  @ApiProperty({ required: true })
  tmdbId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  release_date: string;

  @ApiProperty()
  poster_path: string;

  @ApiProperty()
  overview: string;
}
