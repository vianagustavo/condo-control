import { Inject, UploadedFile } from '@nestjs/common';

import { CREATE_BANK_SLIP_PDF_FILES } from 'src/modules/condo-control/constants';
import { CreateBankSlipsPdfFiles } from 'src/modules/condo-control/domain';

import {
  CreateBankSlipsFilesResource,
  PostBankSlipsFiles,
} from '../_decorators';

@CreateBankSlipsFilesResource()
export class CreateBankSlipsPdfFilesController {
  constructor(
    @Inject(CREATE_BANK_SLIP_PDF_FILES)
    private readonly createBankSlipsPdfFiles: CreateBankSlipsPdfFiles,
  ) {}

  @PostBankSlipsFiles()
  async create(@UploadedFile() file: Express.Multer.File): Promise<boolean> {
    const bankSlips = await this.createBankSlipsPdfFiles.execute(file);

    return !!bankSlips;
  }
}
