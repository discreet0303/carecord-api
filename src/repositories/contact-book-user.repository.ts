// https://github.com/typeorm/typeorm/issues/9013#issuecomment-1177235341

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ContactBookUserEntity } from 'src/entities/contact-book-user.entity';
import { AuthEntity } from 'src/entities/auth.entity';
import { CreateContactBookUserDto } from 'src/modules/contact-book-user/dto/create-contact-book-user.dto';
import { ContactBookUserRelationEntity } from 'src/entities/contact-book-user-relation.entity';

@Injectable()
export class ContactBookUserRepository extends Repository<ContactBookUserEntity> {
  constructor(private dataSource: DataSource) {
    super(ContactBookUserEntity, dataSource.createEntityManager());
  }

  async createContactBookUser(
    auth: AuthEntity,
    createContactBookUserDto: CreateContactBookUserDto,
  ) {
    const { name, birthday, userType, relationType, note } = createContactBookUserDto;
    let bookUser = this.create({ name, type: userType, birthday });

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      bookUser = await transactionalEntityManager.save(bookUser);

      let bookUserRelation = transactionalEntityManager.create(ContactBookUserRelationEntity, {
        countryCode: auth.countryCode,
        phoneNumber: auth.phoneNumber,
        type: relationType,
        note,
        contactBookUser: bookUser,
      });

      bookUserRelation = await transactionalEntityManager.save(bookUserRelation);
      bookUser.contactBookUserRelations = [bookUserRelation];
    });

    return bookUser;
  }
}
