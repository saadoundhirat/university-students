import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Instructor } from "./Instructor";
import { Student } from "./Student";

@Entity("course")
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  name: string;

  @ManyToMany(() => Student, (student) => student.courses, {
    cascade: true,
  })
  @JoinTable({
    name: "transactional",
    joinColumn: {
      name: "courseId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "studentId",
      referencedColumnName: "id",
    },
  })
  public students: Student[];

  @ManyToOne(() => Instructor, (instructor) => instructor.courses, { eager: true })
  @JoinColumn({
    name: "instructorId",
  })
  instructor: Instructor;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;
}
