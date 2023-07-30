import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContactBookQuestionTypeEnum } from 'src/enums/contact-book-question-type.enum';
import { ContactBookOptionEntity } from './contact-book-option.entity';
import { ContactBookQuestionGroupEntity } from './contact-book-question-group.entity';
import { ContactBookRecordEntity } from './contact-book-record.entity';

class ContactBookQuestionColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  labelKey: string;

  @Column({ default: 0 })
  displayOrder: number;

  @Column({ type: 'enum', enum: ContactBookQuestionTypeEnum })
  type: ContactBookQuestionTypeEnum;

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
