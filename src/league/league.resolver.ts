import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LeagueService } from './league.service';
import { LeagueRequestDTO, LeagueResponseDTO } from './dto/league.dto';
import { HttpException } from '@nestjs/common';

@Resolver(() => LeagueRequestDTO)
export class LeagueResolver {
  constructor(private readonly leagueService: LeagueService) {}

  @Mutation((returns) => LeagueResponseDTO)
  async getLeague(@Args('body') body: LeagueRequestDTO): Promise<any> {
    try {
      return this.leagueService.createTournament(body);
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
