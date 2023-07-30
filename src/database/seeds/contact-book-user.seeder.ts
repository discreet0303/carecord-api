/* eslint-disable no-console */

import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ContactBookUserEntity } from 'src/entities/contact-book-user.entity';
import { ContactBookUserRelationEntity } from 'src/entities/contact-book-user-relation.entity';
import { ContactBookUserRelationTypeEnum } from 'src/enums/contact-book-user-relation-type.enum';

export default class ContactBookUserSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    console.log('[ContactBookUserSeeder] running...');

    const cbUserFactory = factoryManager.get(ContactBookUserEntity);
    const cbUser = await cbUserFactory.save();

    const cbUserRelationRepository = dataSource.getRepository(ContactBookUserRelationEntity);
    await cbUserRelationRepository.insert([
      {
        authId: 1,
        contactBookUser: cbUser,
        type: ContactBookUserRelationTypeEnum.CAREGIVER,
      },
    ]);

    console.log('[ContactBookUserSeeder] end');
  }
}
