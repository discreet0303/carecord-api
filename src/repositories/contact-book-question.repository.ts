// https://github.com/typeorm/typeorm/issues/9013#issuecomment-1177235341

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ContactBookQuestionEntity } from 'src/entities/contact-book-question.entity';

@Injectable()
export class ContactBookQuestionRepository extends Repository<ContactBookQuestionEntity> {
  constructor(private dataSource: DataSource) {
    super(ContactBookQuestionEntity, dataSource.createEntityManager());
  }
}
