import { UnitModel } from '../models';

export interface UnitsRepository {
  getUnitsByNames(unitNames: string[]): Promise<UnitModel[]>;
}
