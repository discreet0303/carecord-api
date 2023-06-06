import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactBookUserRelationEntity } from 'src/entities/contact-book-user-relation.entity';
import { ContactBookUserEntity } from 'src/entities/contact-book-user.entity';
import { ContactBookUserRelationRepository } from 'src/repositories/contact-book-user-relation.repository';
import { ContactBookUserRepository } from 'src/repositories/contact-book-user.repository';
import { ContactBookUserController } from './contact-book-user.controller';
import { ContactBookUserService } from './contact-book-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactBookUserRelationEntity, ContactBookUserEntity])],
  controllers: [ContactBookUserController],
  providers: [ContactBookUserService, ContactBookUserRelationRepository, ContactBookUserRepository],
})
export class ContactBookUserModule {}
