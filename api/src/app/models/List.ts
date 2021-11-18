import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Card } from "./Card";
import { User } from "./User";

@Entity("lists")
export class List {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.lists)
  user: User;

  // Ligação com varios Cards
  @OneToMany(() => Card, c => c.list)
  cards: Card[];
}
