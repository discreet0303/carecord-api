import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContactBookQuestionTypeEnum } from 'src/enums/contact-book-question-type.enum';
import { ContactBookOptionEntity } from './contact-book-option.entity';
import { ContactBookQuestionGroupEntity } from './contact-book-question-group.entity';
import { ContactBookRecordEntity } from './contact-book-record.entity';

class ContactBookQuestionColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  displayOrder: number;

  @Column({ nullable: true })
  displayPrefix: string;

  @Column({ nullable: true })
  displaySuffix: string;

  @Column()
  type: ContactBookQuestionTypeEnum;

  @Column({ type: 'json', nullable: true })
  defaultOptions: string[];

  @Column({ nullable: true })
  contactBookQuestionGroupId: number;
}

@Entity('contact-book-question')
export class ContactBookQuestionEntity extends ContactBookQuestionColumn {
  @OneToMany(() => ContactBookRecordEntity, (cbRecord) => cbRecord.contactBookQuestion)
  contactBookRecords: ContactBookRecordEntity[];

  @ManyToOne(
    () => ContactBookQuestionGroupEntity,
    (cbQuestionGroup) => cbQuestionGroup.contactBookQuestions,
  )
  contactBookQuestionGroup?: ContactBookQuestionGroupEntity;

  @OneToMany(() => ContactBookOptionEntity, (option) => option.contactBookQuestion)
  contactBookOptions: ContactBookOptionEntity[];
}
