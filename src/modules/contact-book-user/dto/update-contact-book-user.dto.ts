import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateContactBookUserDto } from './create-contact-book-user.dto';

export class UpdateContactBookUserDto extends PickType(CreateContactBookUserDto, [
  'name',
  'birthday',
]) {
  @ApiProperty()
  @IsNumber()
  authId: number;
}
