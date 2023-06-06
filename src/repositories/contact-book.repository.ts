// https://github.com/typeorm/typeorm/issues/9013#issuecomment-1177235341

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ContactBookEntity } from 'src/entities/contact-book.entity';

@Injectable()
export class ContactBookRepository extends Repository<ContactBookEntity> {
  constructor(private dataSource: DataSource) {
    super(ContactBookEntity, dataSource.createEntityManager());
  }
}
