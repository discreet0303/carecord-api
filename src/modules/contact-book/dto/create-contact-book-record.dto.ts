import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsNumber, IsString, ValidateNested } from 'class-validator';

class ContactBookRecordDto {
  @ApiProperty()
  @IsNumber()
  questionId: number;

  @ApiProperty()
  @IsString()
  answer: string;
}

export class CreateContactBookRecordDto {
  @ApiProperty()
  @IsNumber()
  contactBookUserId: number;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactBookRecordDto)
  records: ContactBookRecordDto[];
}
