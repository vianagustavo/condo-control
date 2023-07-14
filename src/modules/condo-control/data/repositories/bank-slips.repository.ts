import { BankSlipModel, CreateBankSlipInput, UnitModel } from '../models';

export interface BankSlipsRepository {
  createMany(
    createBankSlipInputs: CreateBankSlipInput[],
    units: UnitModel[],
  ): Promise<number>;

  getLatestBankSlipByName(name: string): Promise<BankSlipModel>;
}
