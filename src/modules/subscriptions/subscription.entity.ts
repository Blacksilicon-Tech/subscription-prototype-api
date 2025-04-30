import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string; // MTN | GLO| Airtel|9mobile

  @Column()
  msisdn: string;

  @Column()
  channel: string; // SMS|WEB|USSD

  @Column()
  transactionID: string;

  @Column()
  status: string; // pending, active, failed

  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;
}
