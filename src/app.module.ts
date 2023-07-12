import { Module } from '@nestjs/common';
import { CondoControlModule } from './modules';
import { PrismaService } from './common';

@Module({
  imports: [CondoControlModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
