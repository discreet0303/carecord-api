import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

class AccountColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  avatar: string;
}

@Entity('account')
export class AccountEntity extends AccountColumn {}
