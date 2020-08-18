import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { Status } from "../../shared/entity-status.enum";

@Entity("users_details")
export class UserDetails extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  lastname: string;

  @Column({ type: "varchar", default: Status.ACTIVE, length: 8 })
  status: string;

  @CreateDateColumn({ type: "timestamp", name: "created_at", nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at", nullable: true })
  updatedAt: Date;
}
