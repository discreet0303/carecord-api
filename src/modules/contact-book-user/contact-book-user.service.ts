import { BadRequestException, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { AuthEntity } from 'src/entities/auth.entity';
import { ContactBookUserRepository } from 'src/repositories/contact-book-user.repository';
import { ContactBookUserRelationRepository } from 'src/repositories/contact-book-user-relation.repository';
import { CreateContactBookUserRelationDto } from './dto/create-contact-book-user-relation.dto';
import { UpdateContactBookUserDto } from './dto/update-contact-book-user.dto';

@Injectable()
export class ContactBookUserService {
  constructor(
    private contactBookUserRelationRepository: ContactBookUserRelationRepository,
    private contactBookUserRepository: ContactBookUserRepository,
  ) {}

  async getContactBookUserList(auth: AuthEntity) {
    const cbUserRelations = await this.contactBookUserRelationRepository.find({ where: { auth } });

    const cbUserIds = cbUserRelations.map((item) => item.contactBookUserId);

    if (cbUserIds.length === 0) return null;

    return this.contactBookUserRepository.find({
      where: { id: In(cbUserIds) },
      relations: ['contactBookUserRelations'],
    });
  }

  async updateContactBookUser(
    contactBookUserId: number,
    updateContactBookUserDto: UpdateContactBookUserDto,
  ) {
    const { name, birthday } = updateContactBookUserDto;

    await this.contactBookUserRepository.update({ id: contactBookUserId }, { name, birthday });

    return this.contactBookUserRepository.findOneBy({ id: contactBookUserId });
  }

  async createContactBookUserRelation(
    contactBookUserId: number,
    createContactBookUserRelationDto: CreateContactBookUserRelationDto,
    user?: AuthEntity,
  ) {
    const { relationType, note } = createContactBookUserRelationDto;

    let bookUserRelation = await this.contactBookUserRelationRepository.findOneBy({
      contactBookUserId,
    });

    if (bookUserRelation) throw new BadRequestException('This phone number is already exist.');

    bookUserRelation = this.contactBookUserRelationRepository.create({
      type: relationType,
      note,
      contactBookUserId,
      createdBy: user,
    });

    return this.contactBookUserRelationRepository.save(bookUserRelation);
  }

  async deleteContactBookUserRelation(contactBookUserRelationId: number, auth: AuthEntity) {
    const cbUserRelation = await this.contactBookUserRelationRepository.findOneByOrFail({
      id: contactBookUserRelationId,
    });

    cbUserRelation.deletedAt = new Date();
    cbUserRelation.deletedBy = auth;

    return this.contactBookUserRelationRepository.save(cbUserRelation);
  }
}
