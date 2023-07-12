import { Injectable } from '@nestjs/common';
import { UnitsRepository } from '../../data/repositories';
import { UnitModel } from '../../data';
import { PrismaService } from 'src/common/infra';

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
