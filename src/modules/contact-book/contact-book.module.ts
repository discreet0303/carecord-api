import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactBookOptionEntity } from 'src/entities/contact-book-option.entity';
import { ContactBookQuestionGroupEntity } from 'src/entities/contact-book-question-group.entity';
import { ContactBookQuestionEntity } from 'src/entities/contact-book-question.entity';
import { ContactBookRecordEntity } from 'src/entities/contact-book-record.entity';
import { ContactBookUserEntity } from 'src/entities/contact-book-user.entity';
import { ContactBookEntity } from 'src/entities/contact-book.entity';
import { ContactBookOptionRepository } from 'src/repositories/contact-book-option.repository';
import { ContactBookQuestionGroupRepository } from 'src/repositories/contact-book-question-group.repository';
import { ContactBookQuestionRepository } from 'src/repositories/contact-book-question.repository';
import { ContactBookRecordRepository } from 'src/repositories/contact-book-record.repository';
import { ContactBookUserRepository } from 'src/repositories/contact-book-user.repository';
import { ContactBookRepository } from 'src/repositories/contact-book.repository';
import { ContactBookQuestionService } from './contact-book-question.service';
import { ContactBookController } from './contact-book.controller';
import { ContactBookService } from './contact-book.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContactBookEntity,
      ContactBookRecordEntity,
      ContactBookUserEntity,
      ContactBookOptionEntity,
      ContactBookQuestionGroupEntity,
      ContactBookQuestionEntity,
    ]),
  ],
  controllers: [ContactBookController],
  providers: [
    ContactBookService,
    ContactBookQuestionService,
    ContactBookRepository,
    ContactBookUserRepository,
    ContactBookRecordRepository,
    ContactBookOptionRepository,
    ContactBookQuestionGroupRepository,
    ContactBookQuestionRepository,
  ],
})
export class ContactBookModule {}
