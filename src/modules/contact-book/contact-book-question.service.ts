import { Injectable } from '@nestjs/common';
import { ContactBookQuestionGroupRepository } from 'src/repositories/contact-book-question-group.repository';
import { ContactBookQuestionRepository } from 'src/repositories/contact-book-question.repository';
import { ContactBookUserRepository } from 'src/repositories/contact-book-user.repository';
import { ContactBookOptionRepository } from 'src/repositories/contact-book-option.repository';
import { UpdateContactBookOptionsDto } from './dto/update-contact-book-option.dto';

@Injectable()
export class ContactBookQuestionService {
  constructor(
    private contactBookQuestionRepository: ContactBookQuestionRepository,
    private contactBookQuestionGroupRepository: ContactBookQuestionGroupRepository,
    private contactBookOptionRepository: ContactBookOptionRepository,
    private contactBookUserRepository: ContactBookUserRepository,
  ) {}

  async getContactBookQuestionGroups(contactBookUserId: number) {
    const cbUser = await this.contactBookUserRepository.findOneBy({ id: contactBookUserId });

    return this.contactBookQuestionGroupRepository.findBy({
      type: cbUser.type,
    });
  }

  getContactBookQuestion(contactBookUserId: number, contactBookQuestionGroupId: number) {
    return this.contactBookQuestionRepository.find({
      where: { contactBookQuestionGroupId, contactBookOptions: { contactBookUserId } },
      relations: ['contactBookOptions'],
    });
  }

  async updateContactBookOptions(
    contactBookQuestionId: number,
    updateContactBookOptionsDto: UpdateContactBookOptionsDto,
  ) {
    const { contactBookUserId, options } = updateContactBookOptionsDto;
    let option = await this.contactBookOptionRepository.findOneBy({
      contactBookUserId,
      contactBookQuestionId,
    });

    if (!option) {
      option = this.contactBookOptionRepository.create({
        contactBookUserId,
        contactBookQuestionId,
      });
    }

    option.options = options;

    return this.contactBookOptionRepository.save(option);
  }
}
