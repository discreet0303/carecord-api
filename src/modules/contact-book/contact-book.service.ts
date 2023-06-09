import { Injectable } from '@nestjs/common';
import { max } from 'lodash';
import { Between } from 'typeorm';
import { AuthEntity } from 'src/entities/auth.entity';
import { ContactBookRepository } from 'src/repositories/contact-book.repository';
import { ContactBookRecordRepository } from 'src/repositories/contact-book-record.repository';
import { ContactBookQuestionRepository } from 'src/repositories/contact-book-question.repository';
import { CreateContactBookRecordDto } from './dto/create-contact-book-record.dto';
import { GetContactBookQueryDto } from './dto/get-contact-book-query.dto';

@Injectable()
export class ContactBookService {
  constructor(
    private contactBookRepository: ContactBookRepository,
    private contactBookRecordRepository: ContactBookRecordRepository,
    private contactBookQuestionRepository: ContactBookQuestionRepository,
  ) {}

  async getContactBookData(getContactBookQueryDto: GetContactBookQueryDto) {
    const { contactBookUserId, startDate, endDate } = getContactBookQueryDto;

    const query = this.contactBookRepository
      .createQueryBuilder('cb')
      .leftJoinAndSelect('cb.contactBookRecords', 'cbRecords')
      .where({ contactBookUserId });

    if (startDate && endDate) {
      query.where({ date: Between(startDate, endDate) });
    }

    return query.getMany();
  }

  async createContactBookRecord(
    auth: AuthEntity,
    createContactBookRecordDto: CreateContactBookRecordDto,
  ) {
    const { date, contactBookUserId, records } = createContactBookRecordDto;

    const cb = await this.contactBookRepository.findByCBUserAndDate(contactBookUserId, date);
    const oldCbRecords = await this.contactBookRecordRepository.findBy({
      contactBookId: cb.id,
    });
    const cbRecordGroupUid = max([...oldCbRecords.map((item) => item.groupUid), 0]) + 1;

    const cbRecords = await Promise.all(
      records.map(async (record) => {
        const { questionId, answer } = record;
        const cbQuestion = await this.contactBookQuestionRepository.findOneBy({ id: questionId });

        const cbRecord = this.contactBookRecordRepository.create({
          contactBook: cb,
          contactBookQuestion: cbQuestion,
          answer,
          groupUid: cbRecordGroupUid,
          createdBy: auth,
        });

        return this.contactBookRecordRepository.save(cbRecord);
      }),
    );

    return cbRecords;
  }

  async deleteContactBookRecord(auth: AuthEntity, contactBookId: number, cbRecordGroupUid: number) {
    await this.contactBookRecordRepository.softDelete({
      contactBookId,
      createdBy: auth,
      groupUid: cbRecordGroupUid,
    });

    return { message: 'Delete contact book record successfully.' };
  }
}
