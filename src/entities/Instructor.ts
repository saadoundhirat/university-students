import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("instructor")
export class Instructor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  firstName: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  lastName: string;

  @Column({ type: "date", nullable: true })
  dob: Date;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;
}
