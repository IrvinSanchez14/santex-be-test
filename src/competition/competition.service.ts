import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompetitionRequestDTO } from './dto/competition.dto';

@Injectable()
export class CompetitionService {
  constructor(private prisma: PrismaService) {}

  async getCompetition(competition: CompetitionRequestDTO) {
    try {
      const request = await this.prisma.competition.findFirst({
        where: {
          name: competition.competitionName,
        },
        include: {
          teams: {
            include: {
              players: true,
              coachs: true,
            },
          },
        },
      });

      if (request) {
        return request;
      } else {
        throw new HttpException('League does not exist in DB', 500, {
          cause: new Error('Error'),
        });
      }
    } catch (error) {
      throw new HttpException(error, 500, {
        cause: new Error('Error'),
      });
    }
  }
}
