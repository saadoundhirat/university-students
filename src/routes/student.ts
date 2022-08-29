import express, { Request, Response } from "express";
const router = express.Router();
import { Student } from "../entities/Student";
import { Course } from "../entities/Course";
import { AppDataSource } from "../AppDataSource";

router.get("/", async (req: Request, res: Response) => {
  const allStudents = await Student.find();
  res.status(200).json({
    message: "get all student",
    data: allStudents,
  });
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const student = Student.create({
      ...req.body,
    });
    await student.save();

    res.status(200).json({
      message: "create student",
      data: student,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
      data: { ...error },
      status: 404,
    });

    process.on("uncaughtException", (error) => {
      console.error(error && error.stack);
      process.exit(1);
    });
  }
});

router.get("/:studentId", async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    if (studentId) {
      const student = await Student.findOne({ where: { id: studentId } });
      if (student) {
        res.status(200).json({
          message: "retrive student by ID",
          data: student,
          status: 200,
        });
      } else {
        res.status(404).json({
          message: "Student not found",
          data: null,
          status: 404,
        });
      }
    }
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
      data: { ...error },
      status: 404,
    });

    process.on("uncaughtException", (error) => {
      console.error(error && error.stack);
      process.exit(1);
    });
  }
});

router.delete("/:studentId", async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    if (studentId) {
      const student = await Student.findOne({ where: { id: studentId } });
      if (student) {
        await AppDataSource.createQueryBuilder()
          .delete()
          .from(Student)
          .where("id = :id", { id: studentId })
          .execute();
        res.status(200).json({
          message: `Student ${
            student.firstName + " " + student.lastName
          } has been delete successfully`,
          data: {},
          status: 200,
        });
      } else {
        res.status(404).json({
          message: "Student not found",
          data: null,
          status: 404,
        });
      }
    }
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
      data: { ...error },
      status: 404,
    });

    process.on("uncaughtException", (error) => {
      console.error(error && error.stack);
      process.exit(1);
    });
  }
});

router.put(
  "/:studentId/course/:courseId",
  async (req: Request, res: Response) => {
    try {
      const { studentId, courseId } = req.params;
      if (courseId && studentId) {
        const student = await Student.findOne({
          where: { id: studentId },
          relations: ["courses"],
        });
        const course = await Course.findOne({
          where: { id: courseId },
          relations: ["students"],
        });

        if (!student) {
          res.status(404).json({
            message: `can't found student with id ${studentId}`,
            data: null,
            status: 404,
          });
        } else if (!course) {
          res.status(404).json({
            message: `can't found cours with id ${courseId}`,
            data: null,
            status: 404,
          });
        } else {
          //! we add the student to the relation that has the join colum which is the course (many) relation
          student.courses = [...student?.courses, course];
          await student.save();
          res.status(200).json({
            message: `Student ${
              student.firstName + " " + student.lastName
            } successfully registerd to course ${course.name}`,
            data: null,
            status: 200,
          });
        }
      }
    } catch (error: any) {
      res.status(404).json({
        message: error.message,
        data: { ...error },
        status: 404,
      });

      process.on("uncaughtException", (error) => {
        console.error(error && error.stack);
        process.exit(1);
      });
    }
  }
);

export default router;
