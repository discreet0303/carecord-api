import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContactBookUserRelationTypeEnum } from 'src/enums/contact-book-user-relation-type.enum';
import { AuthEntity } from './auth.entity';
import { ContactBookUserEntity } from './contact-book-user.entity';

class ContactBookUserRelationColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  countryCode: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'enum', enum: ContactBookUserRelationTypeEnum })
  type: ContactBookUserRelationTypeEnum;

  @Column({ nullable: true })
  note: string;

  @Column({ nullable: true })
  contactBookUserId: number;

  @Column({ nullable: true })
  createdById: number;

  @Column({ nullable: true })
  deletedById: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

@Entity('contact-book-user-relation')
export class ContactBookUserRelationEntity extends ContactBookUserRelationColumn {
  @ManyToOne(() => ContactBookUserEntity, (cbUser) => cbUser.contactBookUserRelations)
  contactBookUser: ContactBookUserEntity;

  @ManyToOne(() => AuthEntity)
  createdBy: AuthEntity;

  @ManyToOne(() => AuthEntity)
  deletedBy: AuthEntity;
}
