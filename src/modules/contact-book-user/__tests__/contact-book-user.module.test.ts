import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { ContactBookUserRelationRepository } from 'src/repositories/contact-book-user-relation.repository';
import { ContactBookUserRepository } from 'src/repositories/contact-book-user.repository';
import { dataSourceMockFactory } from 'src/utils/test/typeorm.mock';
import { ContactBookUserController } from '../contact-book-user.controller';
import { ContactBookUserService } from '../contact-book-user.service';

export const ContactBookUserTestModule = Test.createTestingModule({
  controllers: [ContactBookUserController],
  providers: [
    ContactBookUserService,
    { provide: ContactBookUserRelationRepository, useFactory: dataSourceMockFactory },
    { provide: ContactBookUserRepository, useFactory: dataSourceMockFactory },
    { provide: DataSource, useFactory: dataSourceMockFactory },
  ],
});
