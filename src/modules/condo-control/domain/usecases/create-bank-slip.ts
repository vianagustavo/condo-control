import { BankSlipModel } from '../../data';

export interface CreateBankSlip {
  execute(csvFile: Express.Multer.File): Promise<void>;
}
