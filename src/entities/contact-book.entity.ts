import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContactBookUserEntity } from './contact-book-user.entity';
import { ContactBookRecordEntity } from './contact-book-record.entity';
import { ContactBookFileEntity } from './contact-book-file.entity';

class ContactBookColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ nullable: true })
  contactBookUserId: number;
}

@Entity('contact-book')
export class ContactBookEntity extends ContactBookColumn {
  @ManyToOne(() => ContactBookUserEntity, (cbUser) => cbUser.contactBooks)
  contactBookUser?: ContactBookUserEntity;

  @OneToMany(() => ContactBookRecordEntity, (cbRecord) => cbRecord.contactBook)
  contactBookRecords: ContactBookRecordEntity[];

  @OneToMany(() => ContactBookFileEntity, (cbFile) => cbFile.contactBook)
  contactBookFiles: ContactBookFileEntity[];
}
