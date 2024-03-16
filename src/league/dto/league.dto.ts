import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LeagueRequestDTO {
  @Field()
  @IsString()
  readonly leagueCode: string;
}

@ObjectType()
export class LeagueResponseDTO {
  @Field()
  @IsString()
  readonly name: string;
}
