import { BadRequestException, Inject, UploadedFile } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { CREATE_BANK_SLIP } from 'src/modules/condo-control/constants';
import { CreateBankSlip } from 'src/modules/condo-control/domain';

import { BankSlipResource, PostBankSlip } from '../_decorators';
import { BankSlipDto } from '../../dtos';

@BankSlipResource()
export class BankSlipsController {
  constructor(
    @Inject(CREATE_BANK_SLIP)
    private readonly createBankSlip: CreateBankSlip,
  ) {}

  @PostBankSlip()
  async create(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BankSlipDto> {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    const bankSlip = await this.createBankSlip.execute(file);

    return plainToInstance(BankSlipDto, bankSlip);
  }
}
