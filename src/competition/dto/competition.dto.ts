import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { TeamsResponseDTO } from 'src/teams/dto/teams.dto';

@InputType()
export class CompetitionRequestDTO {
  @Field()
  @IsString()
  readonly competitionName: string;
}

@ObjectType()
export class CompetitionResponseDTO {
  @Field()
  @IsString()
  readonly name: string;

  @Field()
  @IsString()
  readonly code: string;

  @Field()
  @IsString()
  readonly areaName: string;

  @Field(() => [TeamsResponseDTO])
  @IsString({ each: true })
  readonly teams: TeamsResponseDTO[];
}
