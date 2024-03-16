import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

import { CompetitionService } from './competition.service';
import { CompetitionResolver } from './competition.resolver';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [PrismaService, CompetitionResolver, CompetitionService],
  exports: [],
})
export class CompetitionModule {}
