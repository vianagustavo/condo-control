import {
  applyDecorators,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BankSlipDto } from '../../dtos';

const RESOURCE_NAME = 'bank-slips';

export function BankSlipResource(): ClassDecorator {
  return applyDecorators(ApiTags(RESOURCE_NAME), Controller(RESOURCE_NAME));
}

export function PostBankSlip(): MethodDecorator {
  return applyDecorators(
    Post(),
    UseInterceptors(FileInterceptor('file_data')),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Creates a Bank Slip',
      type: BankSlipDto,
    }),
  );
}
