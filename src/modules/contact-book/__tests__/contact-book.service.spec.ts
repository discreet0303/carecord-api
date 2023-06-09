import { TestingModule } from '@nestjs/testing';
import { ContactBookService } from '../contact-book.service';
import { ContactBookTestModule } from './contact-book.module.test';

describe('ContactBookService', () => {
  let service: ContactBookService;

  beforeEach(async () => {
    const module: TestingModule = await ContactBookTestModule.compile();

    service = module.get<ContactBookService>(ContactBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
