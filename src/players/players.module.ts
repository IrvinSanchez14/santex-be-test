import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PlayerResolver } from './player.resolver';
import { PlayerService } from './player.service';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [PrismaService, PlayerResolver, PlayerService],
  exports: [],
})
export class PlayersModule {}
