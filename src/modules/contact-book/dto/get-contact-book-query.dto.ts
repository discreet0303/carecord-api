import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class GetContactBookQueryDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  contactBookUserId: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  endDate: string;
}
