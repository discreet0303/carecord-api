import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthTypeEnum } from 'src/enums/auth-type.enum';
import { AccountEntity } from './account.entity';

class AuthColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  countryCode: string;

  @Column()
  phoneNumber: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  passwordSalt: string;

  @Column({ type: 'enum', enum: AuthTypeEnum, default: AuthTypeEnum.APP })
  authType: AuthTypeEnum;

  @Column({ nullable: true })
  accountId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

@Entity('auth')
export class AuthEntity extends AuthColumn {
  @OneToOne(() => AccountEntity, { eager: true })
  @JoinColumn()
  account: AccountEntity;
}
