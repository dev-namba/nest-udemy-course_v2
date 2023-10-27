import { ManyToOne } from 'typeorm';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ItemStatus } from './item-status.enum';
import { User } from 'src/user/entity/user.entity';


@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  status: ItemStatus;

  @Column()
  createdAt: String;

  @Column()
  updatedAt: String;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @Column()
  userId: number;
}