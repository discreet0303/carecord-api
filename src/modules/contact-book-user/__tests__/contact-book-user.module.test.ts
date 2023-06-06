import { Test } from '@nestjs/testing';
import { ContactBookUserController } from '../contact-book-user.controller';
import { ContactBookUserService } from '../contact-book-user.service';

export const ContactBookUserTestModule = Test.createTestingModule({
  controllers: [ContactBookUserController],
  providers: [ContactBookUserService],
});
