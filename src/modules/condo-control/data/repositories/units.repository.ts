import { UnitModel } from '../models';

export interface UnitsRepository {
  getUnitByName(unitName: string): Promise<UnitModel>;
}
