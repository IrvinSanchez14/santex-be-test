import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  DirectiveLocation,
  GraphQLDirective,
  GraphQLFormattedError,
} from 'graphql';
import { join } from 'path';
import { LeagueModule } from './league/league.module';
import { CompetitionModule } from './competition/competition.module';
import { PlayersModule } from './players/players.module';
import { TeamsModule } from './teams/team.module';

@Module({
  imports: [
    PrismaModule,
    LeagueModule,
    CompetitionModule,
    PlayersModule,
    TeamsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      formatError: (error) => {
        const originalError = error.extensions
          ?.originalError as GraphQLFormattedError;

        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
          };
        }
        return {
          message: originalError.message,
          code: error.extensions?.code,
        };
      },
      context: ({ req, res, payload, connection }) => ({
        req,
        res,
        payload,
        connection,
        headers: req.headers,
      }),
    }),
  ],
  providers: [],
})
export class AppModule {}
