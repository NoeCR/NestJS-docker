import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  Entity,
  CreateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Status } from "../../shared/entity-status.enum";

@Entity("books")
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 500 })
  description: string;

  @ManyToMany((type) => User, (user) => user.books)
  @JoinColumn()
  authors: User[];

  @Column({ type: "varchar", default: Status.ACTIVE, length: 8 })
  status: string;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp", name: "updated_at" })
  updatedAt: Date;
}
