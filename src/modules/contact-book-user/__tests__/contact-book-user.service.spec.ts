import { TestingModule } from '@nestjs/testing';
import { ContactBookUserService } from '../contact-book-user.service';
import { ContactBookUserTestModule } from './contact-book-user.module.test';

describe('ContactBookUserService', () => {
  let service: ContactBookUserService;

  beforeEach(async () => {
    const module: TestingModule = await ContactBookUserTestModule.compile();

    service = module.get<ContactBookUserService>(ContactBookUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
