import { Inject } from '@nestjs/common';

import * as csvParser from 'csv-parser';
import { BANK_SLIPS_REPOSITORY } from 'src/modules/condo-control/constants';
import { CreateBankSlip } from 'src/modules/condo-control/domain';

import { CreateBankSlipInput, BankSlipModel } from '../../models';
import { BankSlipsRepository } from '../../repositories';

export class CreateBankSlipService implements CreateBankSlip {
  constructor(
    @Inject(BANK_SLIPS_REPOSITORY)
    private readonly bankSlipsRepository: BankSlipsRepository,
  ) {}

  async execute(csvFile: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const results: CreateBankSlipInput[] = [];

      const stream = csvParser()
        .on('data', (data) => {
          const key = Object.keys(data)[0];
          const values = data[key].split(';');
          const bankSlipInput: CreateBankSlipInput = {
            name: values[0],
            unitName: values[1],
            value: parseFloat(values[2]),
            digitableLine: values[3],
          };

          results.push(bankSlipInput);
        })
        .on('error', (error) => reject(error))
        .on('end', () => {
          console.log({ results });
          resolve(
            results.map((bankSlipInput) => ({
              ...bankSlipInput,
            })),
          );
        });

      stream.write(csvFile.buffer);
      stream.end();
    });
  }
}
