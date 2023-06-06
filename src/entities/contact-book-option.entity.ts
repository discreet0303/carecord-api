import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContactBookQuestionEntity } from './contact-book-question.entity';
import { ContactBookUserEntity } from './contact-book-user.entity';

class ContactBookOptionColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  option: string;

  @Column({ nullable: true })
  contactBookQuestionId: number;

  @Column({ nullable: true })
  contactBookUserId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

@Entity('contact-book-option')
export class ContactBookOptionEntity extends ContactBookOptionColumn {
  @ManyToOne(() => ContactBookQuestionEntity, (question) => question.contactBookOptions)
  contactBookQuestion?: ContactBookQuestionEntity;

  @ManyToOne(() => ContactBookUserEntity, (cbUser) => cbUser.contactBookOptions)
  contactBookUser?: ContactBookUserEntity;
}
