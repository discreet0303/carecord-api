import { TestingModule } from '@nestjs/testing';
import { ContactBookTestModule } from './contact-book.module.test';
import { ContactBookQuestionService } from '../contact-book-question.service';

describe('ContactBookQuestionService', () => {
  let service: ContactBookQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await ContactBookTestModule.compile();

    service = module.get<ContactBookQuestionService>(ContactBookQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
