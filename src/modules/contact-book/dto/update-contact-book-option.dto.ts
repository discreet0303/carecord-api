import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class UpdateContactBookOptionsDto {
  @ApiProperty()
  @IsNumber()
  contactBookUserId: number;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  options: string[];
}
