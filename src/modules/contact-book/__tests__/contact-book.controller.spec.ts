import { TestingModule } from '@nestjs/testing';
import { ContactBookController } from '../contact-book.controller';
import { ContactBookTestModule } from './contact-book.module.test';

describe('ContactBookController', () => {
  let controller: ContactBookController;

  beforeEach(async () => {
    const module: TestingModule = await ContactBookTestModule.compile();

    controller = module.get<ContactBookController>(ContactBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
