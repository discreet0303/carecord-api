import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactBookEntity } from 'src/entities/contact-book.entity';
import { ContactBookRepository } from 'src/repositories/contact-book.repository';
import { ContactBookRecordEntity } from 'src/entities/contact-book-record.entity';
import { ContactBookRecordRepository } from 'src/repositories/contact-book-record.repository';
import { ContactBookQuestionEntity } from 'src/entities/contact-book-question.entity';
import { ContactBookQuestionRepository } from 'src/repositories/contact-book-question.repository';
import { ContactBookController } from './contact-book.controller';
import { ContactBookService } from './contact-book.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContactBookEntity,
      ContactBookRecordEntity,
      ContactBookQuestionEntity,
    ]),
  ],
  controllers: [ContactBookController],
  providers: [
    ContactBookService,
    ContactBookRepository,
    ContactBookRecordRepository,
    ContactBookQuestionRepository,
  ],
})
export class ContactBookModule {}
