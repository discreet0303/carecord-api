import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthEntity } from './auth.entity';
import { ContactBookEntity } from './contact-book.entity';
import { ContactBookQuestionEntity } from './contact-book-question.entity';

class ContactBookRecordColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  contactBookId: number;

  @Column({ nullable: true })
  contactBookQuestionId: number;

  @Column({ type: 'text' })
  answer: string;

  @Column({
    type: 'smallint',
    nullable: true,
    default: 0,
    comment: 'UID from the same question group',
  })
  groupUid: number;

  @Column({ nullable: true })
  createdById: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

@Entity('contact-book-record')
export class ContactBookRecordEntity extends ContactBookRecordColumn {
  @ManyToOne(() => ContactBookEntity, (contactBook) => contactBook.contactBookRecords)
  contactBook?: ContactBookEntity;

  @ManyToOne(() => ContactBookQuestionEntity, (cbQuestion) => cbQuestion.contactBookRecords)
  contactBookQuestion?: ContactBookQuestionEntity;

  @ManyToOne(() => AuthEntity)
  createdBy?: AuthEntity;
}
