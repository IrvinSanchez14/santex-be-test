import { Args, Query, Resolver } from '@nestjs/graphql';
import { CompetitionService } from './competition.service';
import {
  CompetitionRequestDTO,
  CompetitionResponseDTO,
} from './dto/competition.dto';
import { HttpException } from '@nestjs/common';

@Resolver(() => CompetitionResponseDTO)
export class CompetitionResolver {
  constructor(private readonly competitionService: CompetitionService) {}

  @Query(() => CompetitionResponseDTO)
  async getCompetition(
    @Args('body') body: CompetitionRequestDTO,
  ): Promise<any> {
    try {
      return this.competitionService.getCompetition(body);
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }
}
