import { BankSlipModel, CreateBankSlipInput } from '../../data';

export interface CreateBankSlip {
  execute(input: CreateBankSlipInput): Promise<BankSlipModel>;
}
