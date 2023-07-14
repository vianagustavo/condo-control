import { Inject, UploadedFile } from '@nestjs/common';

import { CREATE_BANK_SLIP } from 'src/modules/condo-control/constants';
import { CreateBankSlips } from 'src/modules/condo-control/domain';

import { BankSlipResource, PostBankSlip } from '../_decorators';

@BankSlipResource()
export class BankSlipsController {
  constructor(
    @Inject(CREATE_BANK_SLIP)
    private readonly createBankSlips: CreateBankSlips,
  ) {}

  @PostBankSlip()
  async create(@UploadedFile() file: Express.Multer.File): Promise<boolean> {
    const bankSlips = await this.createBankSlips.execute(file);

    return !!bankSlips;
  }
}
