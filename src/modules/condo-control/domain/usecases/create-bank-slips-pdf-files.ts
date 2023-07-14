export interface CreateBankSlipsPdfFiles {
  execute(pdfFile: Express.Multer.File): Promise<boolean>;
}
