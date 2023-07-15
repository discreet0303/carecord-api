import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { ContactBookOptionRepository } from 'src/repositories/contact-book-option.repository';
import { ContactBookQuestionGroupRepository } from 'src/repositories/contact-book-question-group.repository';
import { ContactBookQuestionRepository } from 'src/repositories/contact-book-question.repository';
import { ContactBookRecordRepository } from 'src/repositories/contact-book-record.repository';
import { ContactBookUserRepository } from 'src/repositories/contact-book-user.repository';
import { ContactBookRepository } from 'src/repositories/contact-book.repository';
import { dataSourceMockFactory } from 'src/utils/test/typeorm.mock';
import { ContactBookQuestionService } from '../contact-book-question.service';
import { ContactBookController } from '../contact-book.controller';
import { ContactBookService } from '../contact-book.service';

export const ContactBookTestModule = Test.createTestingModule({
  controllers: [ContactBookController],
  providers: [
    ContactBookService,
    ContactBookQuestionService,
    { provide: ContactBookUserRepository, useFactory: dataSourceMockFactory },
    { provide: ContactBookOptionRepository, useFactory: dataSourceMockFactory },
    { provide: ContactBookQuestionGroupRepository, useFactory: dataSourceMockFactory },
    { provide: ContactBookRepository, useFactory: dataSourceMockFactory },
    { provide: ContactBookRecordRepository, useFactory: dataSourceMockFactory },
    { provide: ContactBookQuestionRepository, useFactory: dataSourceMockFactory },
    { provide: DataSource, useFactory: dataSourceMockFactory },
  ],
});
