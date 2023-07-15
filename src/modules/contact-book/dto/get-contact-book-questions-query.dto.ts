import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetContactBookQuestionsQueryDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  contactBookUserId: number;
}
