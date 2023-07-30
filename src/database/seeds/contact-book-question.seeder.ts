/* eslint-disable no-console, @typescript-eslint/no-unused-vars */

import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ContactBookQuestionGroupEntity } from 'src/entities/contact-book-question-group.entity';
import { ContactBookUserTypeEnum } from 'src/enums/contact-book-user-type.enum';
import { ContactBookQuestionEntity } from 'src/entities/contact-book-question.entity';
import { ContactBookQuestionTypeEnum } from 'src/enums/contact-book-question-type.enum';

export default class ContactBookQuestionSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    console.log('[ContactBookQuestionSeeder] running...');

    const cbQuestionGroupRepository = dataSource.getRepository(ContactBookQuestionGroupEntity);
    const cbQuestionGroups = await cbQuestionGroupRepository.insert([
      {
        labelKey: 'babe-1',
        displayOrder: 1,
        type: ContactBookUserTypeEnum.BABE,
      },
      {
        labelKey: 'babe-2',
        displayOrder: 2,
        type: ContactBookUserTypeEnum.BABE,
      },
    ]);

    const cbQuestionRepository = dataSource.getRepository(ContactBookQuestionEntity);
    await cbQuestionRepository.insert([
      {
        labelKey: 'babe-1-1',
        displayOrder: 1,
        type: ContactBookQuestionTypeEnum.TEXT,
        contactBookQuestionGroup: cbQuestionGroups.identifiers[0],
      },
      {
        labelKey: 'babe-1-2',
        displayOrder: 2,
        type: ContactBookQuestionTypeEnum.TEXT,
        contactBookQuestionGroup: cbQuestionGroups.identifiers[0],
      },
    ]);

    console.log('[ContactBookQuestionSeeder] end');
  }
}
