import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
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
import { GetContactBookQuestionsQueryDto } from './dto/get-contact-book-questions-query.dto';
import { ContactBookQuestionService } from './contact-book-question.service';
import { UpdateContactBookOptionsDto } from './dto/update-contact-book-option.dto';

@ApiBearerAuth()
@ApiTags('ContactBook')
@UseGuards(JwtAuthGuard)
@Controller('contact-book')
export class ContactBookController {
  constructor(
    private readonly contactBookService: ContactBookService,
    private readonly contactBookQuestionService: ContactBookQuestionService,
  ) {}

  /* Get Method */
  @Get('/question/group/:contactBookQuestionGroupId')
  getContactBookQuestions(
    @Param('contactBookQuestionGroupId', ParseIntPipe) contactBookQuestionGroupId: number,
    @Query() getContactBookQuestionsQueryDto: GetContactBookQuestionsQueryDto,
  ) {
    const { contactBookUserId } = getContactBookQuestionsQueryDto;
    return this.contactBookQuestionService.getContactBookQuestion(
      contactBookUserId,
      contactBookQuestionGroupId,
    );
  }

  @Get('/question/group')
  getContactBookQuestionGroups(
    @Query() getContactBookQuestionsQueryDto: GetContactBookQuestionsQueryDto,
  ) {
    const { contactBookUserId } = getContactBookQuestionsQueryDto;
    return this.contactBookQuestionService.getContactBookQuestionGroups(contactBookUserId);
  }

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

  /* Put Method */
  @Put('/question/:contactBookQuestionId/option')
  updateContactBookOptions(
    @Param('contactBookQuestionId') contactBookQuestionId: number,
    @Body() updateContactBookOptionsDto: UpdateContactBookOptionsDto,
  ) {
    return this.contactBookQuestionService.updateContactBookOptions(
      contactBookQuestionId,
      updateContactBookOptionsDto,
    );
  }

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
