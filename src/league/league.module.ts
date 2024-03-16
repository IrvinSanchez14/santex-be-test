import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LeagueResolver } from './league.resolver';
import { LeagueService } from './league.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [PrismaService, LeagueResolver, LeagueService],
  exports: [],
})
export class LeagueModule {}
