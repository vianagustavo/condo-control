import { Module } from '@nestjs/common';

import { PrismaService } from './common';
import { CondoControlModule } from './modules';

@Module({
  imports: [CondoControlModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
