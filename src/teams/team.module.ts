import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [PrismaService, TeamResolver, TeamService],
  exports: [],
})
export class TeamsModule {}
