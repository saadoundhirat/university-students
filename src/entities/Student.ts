import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
} from "typeorm";
import { Course } from "./Course";

@Entity("student")
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  firstName: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  lastName: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  major: string;

  @Column({ type: "date", nullable: true })
  dob: Date;

  @ManyToMany(
    () => Course
  )
  courses: Course[]


  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;
}
