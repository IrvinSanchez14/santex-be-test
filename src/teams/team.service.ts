import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeamRequestDTO } from './dto/teams.dto';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async getTeams(body: TeamRequestDTO) {
    try {
      const request = await this.prisma.competition.findUnique({
        where: {
          code: body.leagueCode,
        },
        include: {
          teams: {
            where: {
              shortName: body.teamName,
            },
            include: {
              players: body.showPlayers,
            },
          },
        },
      });

      if (request) {
        const teams = request.teams.map((team) => {
          return {
            ...team,
          };
        });

        return teams;
      } else {
        throw new HttpException('League Code does not exist in DB', 500, {
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
