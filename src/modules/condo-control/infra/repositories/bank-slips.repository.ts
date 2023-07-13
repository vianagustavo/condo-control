import { Inject, Injectable } from '@nestjs/common';
import { UnitsRepository } from '../../data/repositories';
import { BankSlipModel, CreateBankSlipInput } from '../../data';
import { PrismaService } from 'src/common/infra';
import { BankSlipsRepository } from '../../data/repositories/bank-slips.repository';
import { UNITS_REPOSITORY } from '../../constants';

@Injectable()
export class PrismaBankSlipsRepository implements BankSlipsRepository {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(UNITS_REPOSITORY)
    private readonly unitsRepository: UnitsRepository,
  ) {}

  public async create(
    createBankSlipInput: CreateBankSlipInput,
  ): Promise<BankSlipModel> {
    const unit = await this.unitsRepository.getUnitByName(
      createBankSlipInput.name,
    );

    const bankSlip = await this.prismaService.bankSlips.create({
      data: {
        drawee_name: createBankSlipInput.name,
        digitable_line: createBankSlipInput.digitableLine,
        value: createBankSlipInput.value,
        unit_id: unit.id,
        active: true,
      },
    });

    const parsedBankSlip: BankSlipModel = {
      id: bankSlip.id,
      draweeName: bankSlip.drawee_name,
      digitableLine: bankSlip.digitable_line,
      active: bankSlip.active,
      unitId: bankSlip.unit_id,
      createdAt: bankSlip.created_at,
    };

    return parsedBankSlip;
  }
}
