import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContactBookUserTypeEnum } from 'src/enums/contact-book-user-type.enum';
import { ContactBookQuestionEntity } from './contact-book-question.entity';

class ContactBookQuestionGroupColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  displayOrder: number;

  @Column({ type: 'enum', enum: ContactBookUserTypeEnum })
  type: ContactBookUserTypeEnum;
}

@Entity('contact-book-question-group')
export class ContactBookQuestionGroupEntity extends ContactBookQuestionGroupColumn {
  @OneToMany(() => ContactBookQuestionEntity, (cbQuestion) => cbQuestion.contactBookQuestionGroup)
  contactBookQuestions: ContactBookQuestionEntity[];
}
