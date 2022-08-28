import { DataSource } from "typeorm";
import { Student } from "./entities/Student";
import { Instructor } from "./entities/Instructor";
import { Course } from "./entities/Course";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "saadoun",
  password: "saadoun93",
  database: "university",
  synchronize: true,
  // logging: true,
  entities: [Student, Instructor, Course],
  subscribers: [],
  migrations: [],
});
