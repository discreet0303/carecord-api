import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContactBookUserTypeEnum } from 'src/enums/contact-book-user-type.enum';
import { ContactBookEntity } from './contact-book.entity';
import { ContactBookOptionEntity } from './contact-book-option.entity';
import { ContactBookUserRelationEntity } from './contact-book-user-relation.entity';
import { AuthEntity } from './auth.entity';

class ContactBookUserColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ContactBookUserTypeEnum })
  type: ContactBookUserTypeEnum;

  @Column({ type: 'date', nullable: true })
  birthday: string;

  @Column({ type: 'json', nullable: true })
  additionData: Record<string, any>;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  ownerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

@Entity('contact-book-user')
export class ContactBookUserEntity extends ContactBookUserColumn {
  @ManyToOne(() => AuthEntity)
  owner: AuthEntity;

  @OneToMany(
    () => ContactBookUserRelationEntity,
    (cbUserRelation) => cbUserRelation.contactBookUser,
  )
  contactBookUserRelations: ContactBookUserRelationEntity[];

  @OneToMany(() => ContactBookEntity, (cb) => cb.contactBookUser)
  contactBooks: ContactBookEntity[];

  @OneToMany(() => ContactBookOptionEntity, (cbOption) => cbOption.contactBookUser)
  contactBookOptions: ContactBookOptionEntity[];
}
