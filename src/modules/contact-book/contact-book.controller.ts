import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IRequest } from 'src/types/common.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ContactBookService } from './contact-book.service';
import { CreateContactBookRecordDto } from './dto/create-contact-book-record.dto';
import { GetContactBookQueryDto } from './dto/get-contact-book-query.dto';

@ApiBearerAuth()
@ApiTags('ContactBook')
@UseGuards(JwtAuthGuard)
@Controller('contact-book')
export class ContactBookController {
  constructor(private readonly contactBookService: ContactBookService) {}

  /* Get Method */
  @Get('/')
  getContactBookData(@Query() getContactBookQueryDto: GetContactBookQueryDto) {
    return this.contactBookService.getContactBookData(getContactBookQueryDto);
  }

  /* Post Method */
  @Post('/record')
  createContactBookRecord(
    @Req() request: IRequest,
    @Body() createContactBookRecordDto: CreateContactBookRecordDto,
  ) {
    return this.contactBookService.createContactBookRecord(
      request.user,
      createContactBookRecordDto,
    );
  }

  /* Patch Method */

  /* Delete Method */
  @Delete('/:contactBookId/record/:cbRecordGroupUid')
  deleteContactBookRecord(
    @Req() request: IRequest,
    @Param('contactBookId', ParseIntPipe) contactBookId: number,
    @Param('cbRecordGroupUid', ParseIntPipe) cbRecordGroupUid: number,
  ) {
    return this.contactBookService.deleteContactBookRecord(
      request.user,
      contactBookId,
      cbRecordGroupUid,
    );
  }
}
