import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Course } from "./Course";

@Entity("instructor")
export class Instructor extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  firstName: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  lastName: string;

  @Column({ type: "date", nullable: true })
  dob: Date;

  @OneToMany(() => Course, (course) => course.instructor, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  courses: Course[];

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;
}
