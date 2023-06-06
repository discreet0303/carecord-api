import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ContactBookUserRelationTypeEnum } from 'src/enums/contact-book-user-relation-type.enum';

export class CreateContactBookUserRelationDto {
  @ApiProperty()
  @IsString()
  countryCode: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsEnum(ContactBookUserRelationTypeEnum)
  relationType: ContactBookUserRelationTypeEnum;

  @ApiProperty()
  @IsString()
  @IsOptional()
  note?: string;
}
