import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
  @ApiProperty({ required: true })
  raiting: number;

  @ApiProperty({ required: true })
  movie: number;

  @ApiProperty({ required: true })
  author: string;
}
