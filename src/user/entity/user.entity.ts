import { UserStatus } from "src/auth/user-status.enum";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  username: string;

  @Column()
  password: string;

  @Column()
  status: UserStatus;
}