export interface CreateBankSlips {
  execute(csvFile: Express.Multer.File): Promise<boolean>;
}
