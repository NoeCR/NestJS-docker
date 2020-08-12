import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { UserDetails } from "./user.details.entity";
import { Role } from "../role/role.entity";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", unique: true, length: 25, nullable: false })
  username: string;

  @Column({ type: "varchar", unique: true, length: 25, nullable: false })
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "varchar", default: "active", length: 8 })
  status: string;

  @Column({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @Column({ type: "timestamp", name: "updated_at" })
  updatedAt: Date;

  @OneToOne(
    (type) => UserDetails,
    { cascade: true, nullable: false, eager: true },
  )
  @JoinColumn({ name: "detail_id" })
  details: UserDetails;

  @ManyToMany((type) => Role, (role) => role.users)
  @JoinColumn({ name: "user_roles" })
  roles: Role[];
}
