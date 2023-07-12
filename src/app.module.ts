import { Module } from '@nestjs/common';
import { CondoControlModule } from './modules';

@Module({
  imports: [CondoControlModule],
})
export class AppModule {}
