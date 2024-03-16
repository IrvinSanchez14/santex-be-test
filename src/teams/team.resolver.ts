import { Args, Query, Resolver } from '@nestjs/graphql';
import { HttpException } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamOnlyResponseDTO, TeamRequestDTO } from './dto/teams.dto';

@Resolver(() => {})
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Query(() => [TeamOnlyResponseDTO])
  async getTeams(@Args('body') body: TeamRequestDTO): Promise<any> {
    try {
      return this.teamService.getTeams(body);
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }
}
