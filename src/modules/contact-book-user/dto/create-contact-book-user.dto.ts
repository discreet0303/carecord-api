import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ContactBookUserRelationTypeEnum } from 'src/enums/contact-book-user-relation-type.enum';
import { ContactBookUserTypeEnum } from 'src/enums/contact-book-user-type.enum';

export class CreateContactBookUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDateString()
  birthday: string;

  @ApiProperty()
  @IsEnum(ContactBookUserTypeEnum)
  userType: ContactBookUserTypeEnum;

  @ApiProperty()
  @IsEnum(ContactBookUserRelationTypeEnum)
  relationType: ContactBookUserRelationTypeEnum;

  @ApiProperty()
  @IsOptional()
  @IsString()
  note?: string;
}
