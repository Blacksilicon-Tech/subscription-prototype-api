import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Exclude } from 'class-transformer';
import { Subscription } from '../subscriptions/subscription.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  apiToken: string;

  @Column()
  productCode: string;

  @Column()
  productAmount: number;

  @Column()
  accessCode: string;

  @Column({ nullable: true })
  webhookUrl: string;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  generateJwtToken(): string {
    return jwt.sign(
      { id: this.id, email: this.email },
      process.env.JWT_SECRET || 'secretKey',
      { expiresIn: '1d' },
    );
  }

  generateApiToken(): string {
    const token = jwt.sign(
      { id: this.id, email: this.email },
      process.env.API_SECRET || 'apiSecretKey',
      { expiresIn: '30d' },
    );
    this.apiToken = token;
    return token;
  }
}
