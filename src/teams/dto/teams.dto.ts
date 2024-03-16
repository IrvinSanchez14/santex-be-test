import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { CoachesResponseDTO } from 'src/coaches/dto/coaches.dto';
import { PlayersResponseDTO } from 'src/players/dto/players.dto';

@ObjectType()
export class TeamOnlyResponseDTO {
  @Field()
  @IsString()
  readonly name: string;

  @Field()
  @IsString()
  readonly tla: string;

  @Field()
  @IsString()
  readonly shortName: string;

  @Field()
  @IsString()
  readonly areaName: string;

  @Field()
  @IsString()
  readonly address: string;

  @Field(() => [PlayersResponseDTO])
  @IsOptional({ each: true })
  readonly players?: PlayersResponseDTO[];
}

@ObjectType()
export class TeamsResponseDTO {
  @Field()
  @IsString()
  readonly name: string;

  @Field()
  @IsString()
  readonly tla: string;

  @Field()
  @IsString()
  readonly shortName: string;

  @Field()
  @IsString()
  readonly areaName: string;

  @Field()
  @IsString()
  readonly address: string;

  @Field(() => [PlayersResponseDTO])
  @IsString({ each: true })
  readonly players: PlayersResponseDTO[];

  @Field(() => [CoachesResponseDTO])
  @IsString({ each: true })
  readonly coachs: CoachesResponseDTO[];
}

@InputType()
export class TeamRequestDTO {
  @Field()
  @IsString()
  readonly leagueCode: string;

  @Field({ nullable: true })
  @IsOptional()
  readonly teamName?: string;

  @Field({ nullable: true })
  @IsOptional()
  readonly showPlayers?: boolean;
}
