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

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  passwordSalt: string;

  @Exclude()
  @Column({ type: 'enum', enum: AuthTypeEnum, default: AuthTypeEnum.APP_USERNAME })
  authType: AuthTypeEnum;

  @Column({ default: false })
  isVerified: boolean;

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
