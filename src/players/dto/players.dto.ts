import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ObjectType()
export class PlayerTeamResponseDTO {
  @Field()
  @IsString()
  readonly teamName: string;

  @Field(() => [PlayersResponseDTO])
  @IsString({ each: true })
  readonly players: PlayersResponseDTO[];
}

@ObjectType()
export class PlayersResponseDTO {
  @Field()
  @IsString()
  readonly name: string;

  @Field()
  @IsString()
  readonly position: string;

  @Field()
  @IsString()
  readonly dateOfBirth: string;

  @Field()
  @IsString()
  readonly nationality: string;
}

@InputType()
export class PlayersRequestDTO {
  @Field()
  @IsString()
  readonly leagueCode: string;

  @Field({ nullable: true })
  @IsOptional()
  readonly teamName?: string;
}
