// https://github.com/typeorm/typeorm/issues/9013#issuecomment-1177235341

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ContactBookQuestionGroupEntity } from 'src/entities/contact-book-question-group.entity';

@Injectable()
export class ContactBookQuestionGroupRepository extends Repository<ContactBookQuestionGroupEntity> {
  constructor(private dataSource: DataSource) {
    super(ContactBookQuestionGroupEntity, dataSource.createEntityManager());
  }
}
