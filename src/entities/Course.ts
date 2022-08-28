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
} from "typeorm";
import { Student } from "./Student";

@Entity("course")
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  instructorId: string;

  @ManyToMany(
    () => Student
  )
  @JoinTable({
    name: "transactional", 
    joinColumn: {
      name: "course",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name :"student",
      referencedColumnName: "id",
    }
  })
  students: Student[]

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;
}
