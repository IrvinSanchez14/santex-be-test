import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlayersRequestDTO } from './dto/players.dto';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  async getPlayers(body: PlayersRequestDTO) {
    try {
      const request = await this.prisma.competition.findFirst({
        where: {
          code: body.leagueCode,
        },
        include: {
          teams: {
            where: {
              shortName: body.teamName,
            },
            include: {
              players: true,
            },
          },
        },
      });

      if (request) {
        const players = request.teams.map((team) => {
          return {
            teamName: team.shortName,
            players: team.players,
          };
        });

        return players;
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
