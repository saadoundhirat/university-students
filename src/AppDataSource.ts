import { DataSource } from "typeorm";
import { Student } from "./entities/Student";
import { Instructor } from "./entities/Instructor";
import { Course } from "./entities/Course";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: `${process.env.DATABASE_URL}`,
  port: 5432,
  username: `${process.env.DATABASE_USER_NAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABSE_NAME}`,
  synchronize: true,
  entities: [Student, Instructor, Course],
  subscribers: [],
  migrations: [],
  logging: true,
});
