import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/infra';

import { BankSlipModel, CreateBankSlipInput, UnitModel } from '../../data';
import { BankSlipsRepository } from '../../data/repositories';

@Injectable()
export class PrismaBankSlipsRepository implements BankSlipsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async createMany(
    createBankSlipInputs: CreateBankSlipInput[],
    units: UnitModel[],
  ): Promise<number> {
    const bankSlipsToCreate = createBankSlipInputs.map((input) => {
      const inputUnit = units.find((unit) => {
        return unit.name === input.unitName;
      });

      return {
        drawee_name: input.name,
        digitable_line: input.digitableLine,
        value: input.value,
        unit_id: inputUnit.id,
        active: true,
      };
    });

    const bankSlips = await this.prismaService.bankSlips.createMany({
      data: bankSlipsToCreate,
    });

    return bankSlips.count;
  }

  public async getLatestBankSlipByName(name: string): Promise<BankSlipModel> {
    const bankSlip = await this.prismaService.bankSlips.findFirst({
      where: {
        drawee_name: name,
      },
      orderBy: {
        id: 'desc',
      },
    });

    const parsedBankSlips: BankSlipModel = {
      id: bankSlip.id,
      draweeName: bankSlip.drawee_name,
      digitableLine: bankSlip.digitable_line,
      active: bankSlip.active,
      unitId: bankSlip.unit_id,
      createdAt: bankSlip.created_at,
    };

    return parsedBankSlips;
  }
}
