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

class ContactBookFileColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  contactBookId: number;

  @Column({ nullable: true })
  filePath: string;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({ nullable: true })
  extension?: string;

  @Column({ nullable: true })
  originalFileSize?: number;

  @Column({ nullable: true })
  compressedFileSize?: number;

  @Column({ default: false })
  isUploaded: boolean;

  @Column({ nullable: true })
  createdById: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

@Entity('contact-book-file')
export class ContactBookFileEntity extends ContactBookFileColumn {
  @ManyToOne(() => ContactBookEntity, (cb) => cb.contactBookFiles)
  contactBook: ContactBookEntity;

  @ManyToOne(() => AuthEntity)
  createdBy: AuthEntity;
}
