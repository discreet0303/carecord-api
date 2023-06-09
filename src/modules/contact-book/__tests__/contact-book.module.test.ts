import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { ContactBookRepository } from 'src/repositories/contact-book.repository';
import { ContactBookQuestionRepository } from 'src/repositories/contact-book-question.repository';
import { ContactBookRecordRepository } from 'src/repositories/contact-book-record.repository';
import { dataSourceMockFactory } from 'src/utils/test/typeorm.mock';
import { ContactBookController } from '../contact-book.controller';
import { ContactBookService } from '../contact-book.service';

export const ContactBookTestModule = Test.createTestingModule({
  controllers: [ContactBookController],
  providers: [
    ContactBookService,
    { provide: ContactBookRepository, useFactory: dataSourceMockFactory },
    { provide: ContactBookRecordRepository, useFactory: dataSourceMockFactory },
    { provide: ContactBookQuestionRepository, useFactory: dataSourceMockFactory },
    { provide: DataSource, useFactory: dataSourceMockFactory },
  ],
});
