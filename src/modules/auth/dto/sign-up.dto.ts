import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Matches } from 'class-validator';
import { PASSWORD_REGEX } from 'src/constants/regex';
import { AuthTypeEnum } from 'src/enums/auth-type.enum';

export class SignUpDto {
  @ApiProperty()
  @IsEnum(AuthTypeEnum)
  type: AuthTypeEnum;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @Matches(PASSWORD_REGEX)
  @IsString()
  password: string;
}
