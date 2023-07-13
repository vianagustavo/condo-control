import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';

import { BankSlipModel } from '../../data';

@Exclude()
export class BankSlipDto implements BankSlipModel {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  draweeName: string;

  @Expose()
  @ApiProperty()
  unitId: string;

  @Expose()
  @ApiProperty()
  digitableLine: string;

  @Expose()
  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  constructor(partial: Partial<BankSlipDto>) {
    Object.assign(this, partial);
  }
}
