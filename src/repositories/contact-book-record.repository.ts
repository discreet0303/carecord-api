// https://github.com/typeorm/typeorm/issues/9013#issuecomment-1177235341

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ContactBookRecordEntity } from 'src/entities/contact-book-record.entity';

@Injectable()
export class ContactBookRecordRepository extends Repository<ContactBookRecordEntity> {
  constructor(private dataSource: DataSource) {
    super(ContactBookRecordEntity, dataSource.createEntityManager());
  }
}
