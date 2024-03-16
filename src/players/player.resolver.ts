import { Args, Query, Resolver } from '@nestjs/graphql';
import { HttpException } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerTeamResponseDTO, PlayersRequestDTO } from './dto/players.dto';

@Resolver(() => [PlayerTeamResponseDTO])
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  @Query(() => [PlayerTeamResponseDTO])
  async getPlayers(@Args('body') body: PlayersRequestDTO): Promise<any> {
    try {
      return this.playerService.getPlayers(body);
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }
}
