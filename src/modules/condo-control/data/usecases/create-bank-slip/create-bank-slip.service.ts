import { BadRequestException, Inject } from '@nestjs/common';

import * as csvParser from 'csv-parser';
import {
  BANK_SLIPS_REPOSITORY,
  UNITS_REPOSITORY,
} from 'src/modules/condo-control/constants';
import { CreateBankSlips } from 'src/modules/condo-control/domain';

import { CreateBankSlipInput } from '../../models';
import { BankSlipsRepository, UnitsRepository } from '../../repositories';

export class CreateBankSlipsService implements CreateBankSlips {
  constructor(
    @Inject(BANK_SLIPS_REPOSITORY)
    private readonly bankSlipsRepository: BankSlipsRepository,
    @Inject(UNITS_REPOSITORY)
    private readonly unitsRepository: UnitsRepository,
  ) {}

  async execute(csvFile: Express.Multer.File): Promise<boolean> {
    if (!csvFile) {
      throw new BadRequestException('No file uploaded.');
    }
    const bankSlipInputs: CreateBankSlipInput[] = [];

    const stream = csvParser().on('data', (data) => {
      const key = Object.keys(data)[0];
      const values = data[key].split(';');
      const bankSlipInput = {
        name: values[0],
        unitName: values[1],
        value: parseFloat(values[2]),
        digitableLine: values[3],
      };

      bankSlipInputs.push(bankSlipInput);
    });

    stream.write(csvFile.buffer);
    stream.end();

    const inputUnitNames = bankSlipInputs.map((input) => {
      return input.unitName;
    });

    const units = await this.unitsRepository.getUnitsByNames(inputUnitNames);

    const createdBankSlips = await this.bankSlipsRepository.createMany(
      bankSlipInputs,
      units,
    );

    return !!createdBankSlips;
  }
}
