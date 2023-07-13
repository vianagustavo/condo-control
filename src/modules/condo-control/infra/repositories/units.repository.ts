import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/infra';

import { UnitModel, UnitsRepository } from '../../data';

@Injectable()
export class PrismaUnitsRepository implements UnitsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getUnitByName(unitName: string): Promise<UnitModel> {
    const unit = await this.prismaService.units.findFirst({
      where: {
        name: unitName,
      },
    });

    return unit;
  }
}
