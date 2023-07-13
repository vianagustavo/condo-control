import { BankSlipModel, CreateBankSlipInput } from '../models';

export interface BankSlipsRepository {
  create(createBankSlipInput: CreateBankSlipInput): Promise<BankSlipModel>;
}
