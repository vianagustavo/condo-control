import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/infra';

import { UnitModel, UnitsRepository } from '../../data';

@Injectable()
export class PrismaUnitsRepository implements UnitsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getUnitsByNames(unitNames: string[]): Promise<UnitModel[]> {
    const units = await this.prismaService.units.findMany({
      where: {
        name: {
          in: unitNames,
        },
      },
    });

    return units;
  }
}
