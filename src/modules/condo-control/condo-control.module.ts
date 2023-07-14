import { Module } from '@nestjs/common';

import { PrismaService } from 'src/common';

import {
  BANK_SLIPS_REPOSITORY,
  CREATE_BANK_SLIP,
  CREATE_BANK_SLIP_PDF_FILES,
  UNITS_REPOSITORY,
} from './constants';
import { CreateBankSlipsPdfFilesService, CreateBankSlipsService } from './data';
import { PrismaUnitsRepository } from './infra';
import { PrismaBankSlipsRepository } from './infra/repositories/bank-slips.repository';
import {
  BankSlipsController,
  CreateBankSlipsPdfFilesController,
} from './presentation';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: BANK_SLIPS_REPOSITORY,
      useClass: PrismaBankSlipsRepository,
    },
    {
      provide: CREATE_BANK_SLIP,
      useClass: CreateBankSlipsService,
    },
    {
      provide: CREATE_BANK_SLIP_PDF_FILES,
      useClass: CreateBankSlipsPdfFilesService,
    },
    {
      provide: UNITS_REPOSITORY,
      useClass: PrismaUnitsRepository,
    },
  ],
  controllers: [BankSlipsController, CreateBankSlipsPdfFilesController],
})
export class CondoControlModule {}
