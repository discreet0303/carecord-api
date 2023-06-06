import { TestingModule } from '@nestjs/testing';
import { ContactBookUserController } from '../contact-book-user.controller';
import { ContactBookUserTestModule } from './contact-book-user.module.test';

describe('ContactBookUserController', () => {
  let controller: ContactBookUserController;

  beforeEach(async () => {
    const module: TestingModule = await ContactBookUserTestModule.compile();

    controller = module.get<ContactBookUserController>(ContactBookUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
