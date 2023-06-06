// https://github.com/typeorm/typeorm/issues/9013#issuecomment-1177235341

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ContactBookOptionEntity } from 'src/entities/contact-book-option.entity';

@Injectable()
export class ContactBookOptionRepository extends Repository<ContactBookOptionEntity> {
  constructor(private dataSource: DataSource) {
    super(ContactBookOptionEntity, dataSource.createEntityManager());
  }
}
