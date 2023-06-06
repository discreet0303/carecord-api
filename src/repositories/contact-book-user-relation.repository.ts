// https://github.com/typeorm/typeorm/issues/9013#issuecomment-1177235341

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ContactBookUserRelationEntity } from 'src/entities/contact-book-user-relation.entity';

@Injectable()
export class ContactBookUserRelationRepository extends Repository<ContactBookUserRelationEntity> {
  constructor(private dataSource: DataSource) {
    super(ContactBookUserRelationEntity, dataSource.createEntityManager());
  }
}
