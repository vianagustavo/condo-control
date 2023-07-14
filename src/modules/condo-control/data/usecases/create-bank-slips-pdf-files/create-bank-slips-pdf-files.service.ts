import { BadRequestException, Inject } from '@nestjs/common';

import { PDFExtract } from 'pdf.js-extract';
import { BANK_SLIPS_REPOSITORY } from 'src/modules/condo-control/constants';
import { CreateBankSlipsPdfFiles } from 'src/modules/condo-control/domain';

import { BankSlipsRepository } from '../../repositories';

export class CreateBankSlipsPdfFilesService implements CreateBankSlipsPdfFiles {
  constructor(
    @Inject(BANK_SLIPS_REPOSITORY)
    private readonly bankSlipsRepository: BankSlipsRepository,
  ) {}

  async execute(pdfFile: Express.Multer.File): Promise<boolean> {
    if (!pdfFile) {
      throw new BadRequestException('No file uploaded.');
    }

    const pdfExtracter = new PDFExtract();
    const parsedPdf = await pdfExtracter.extractBuffer(pdfFile.buffer);
    const parsedPdfPages = parsedPdf.pages;

    const bankSlipNames = parsedPdfPages.map((pdfPage) => {
      const bankSlipName = pdfPage.content.map(
        (pageContent) => pageContent.str,
      );

      return bankSlipName.join('');
    });

    const bankSlips = await Promise.all(
      bankSlipNames.map(async (name) => {
        const bankSlip = this.bankSlipsRepository.getLatestBankSlipByName(name);

        return bankSlip;
      }),
    );

    return true;
  }
}
