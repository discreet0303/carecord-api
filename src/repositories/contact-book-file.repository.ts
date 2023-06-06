// https://github.com/typeorm/typeorm/issues/9013#issuecomment-1177235341

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ContactBookFileEntity } from 'src/entities/contact-book-file.entity';

@Injectable()
export class ContactBookFileRepository extends Repository<ContactBookFileEntity> {
  constructor(private dataSource: DataSource) {
    super(ContactBookFileEntity, dataSource.createEntityManager());
  }
}
