import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users_details")
export class UserDetails extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  lastname: string;

  @Column({ type: "varchar", default: "active", length: 8 })
  status: string;

  @Column({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @Column({ type: "timestamp", name: "updated_at" })
  updatedAt: Date;
}
