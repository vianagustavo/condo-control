import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';

import { BankSlipModel } from '../../data';

@Exclude()
export class BankSlipDto implements BankSlipModel {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  draweeName: string;

  @Expose()
  @ApiProperty()
  unitId: number;

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
