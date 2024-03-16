import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeagueRequestDTO } from './dto/league.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

interface IteamDB {
  [key: string]: any;
}

const requestHeader = {
  'X-Auth-Token': process.env.ACCESS_TOKEN,
};

@Injectable()
export class LeagueService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  getTournament(tournament: string) {
    const competitionRequest = this.httpService
      .get<any>(`${process.env.API_URL}/competitions/${tournament}`, {
        headers: requestHeader,
      })
      .pipe(
        map((res) => {
          return {
            name: res.data.name,
            code: res.data.code,
            areaName: res.data.area.name,
          };
        }),
      );
    return competitionRequest;
  }

  getTeamsFromTournament(tournament: string) {
    const teamsRequest = this.httpService
      .get<any>(`${process.env.API_URL}/competitions/${tournament}/teams`, {
        headers: requestHeader,
      })
      .pipe(
        map((res) => {
          return {
            teams: res.data.teams,
          };
        }),
      );
    return teamsRequest;
  }

  async createCompetition(league: string) {
    try {
      const requestLeague = await lastValueFrom(this.getTournament(league));
      const existingCompetition = await this.prisma.competition.findUnique({
        where: {
          code: requestLeague.code as string,
        },
      });

      if (!existingCompetition) {
        const createCompetition = await this.prisma.competition.create({
          data: {
            ...requestLeague,
            name: `importLeague ${requestLeague.code}`,
          },
        });
        return createCompetition;
      } else {
        throw new HttpException(
          'This league already exists in the database, insert another league',
          500,
          { cause: new Error('Error') },
        );
      }
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }

  async createTeamAndPlayer(league: string, competitionId: number) {
    try {
      const requestTeams = await lastValueFrom(
        this.getTeamsFromTournament(league),
      );

      const teamsDB = requestTeams.teams.map((team) => {
        let dbTeam: IteamDB = {
          competitionId: competitionId,
          name: team.name,
          tla: team.tla,
          shortName: team.shortName,
          areaName: team.area.name,
          address: team.address,
        };

        return dbTeam;
      });
      const request = await this.prisma.team.createMany({
        data: teamsDB,
        skipDuplicates: true,
      });

      await this.createPlayer(competitionId, requestTeams.teams);

      return request;
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }

  async createPlayer(competitionId: number, players: any[]) {
    try {
      let playersArr = [];
      let coachArr = {};
      const teams = await this.prisma.team.findMany({
        where: {
          competitionId: competitionId,
        },
      });

      const playersDb = players.map((obj) => {
        const teamStore = teams.find(({ name }) => obj.name === name);
        return {
          teamId: teamStore.id,
          name: teamStore.name,
          squad: obj.squad,
          coach: obj.coach,
        };
      });

      playersDb.map((player) => {
        if (player.squad.length > 0) {
          const playerNew = player.squad.map((item) => {
            return {
              teamCurrentId: player.teamId,
              name: item.name,
              position: item.position || '',
              dateOfBirth: item.dateOfBirth || '',
              nationality: item.nationality,
            };
          });
          playersArr.push(...playerNew);
        } else {
          coachArr = {
            teamCurrentId: player.teamId,
            name: player.coach.name,
            dateOfBirth: player.coach.dateOfBirth || '',
            nationality: player.coach.nationality,
          };
        }
      });

      if (playersArr.length > 0) {
        await this.prisma.player.createMany({
          data: playersArr,
          skipDuplicates: true,
        });
      }

      if (Object.keys(coachArr).length > 0) {
        await this.prisma.coach.create({
          data: coachArr as any,
        });
      }
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }

  async createTournament(league: LeagueRequestDTO): Promise<any> {
    try {
      const competition = await this.createCompetition(league.leagueCode);
      await this.createTeamAndPlayer(league.leagueCode, competition.id);

      return {
        name: competition.name,
      };
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }
}
