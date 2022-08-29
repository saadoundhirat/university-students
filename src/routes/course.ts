import express, { Request, Response } from "express";
import { AppDataSource } from "../AppDataSource";
const router = express.Router();
import { Course } from "../entities/Course";
import { Instructor } from "../entities/Instructor";

router.get("/", async (req, res) => {
  const allCourses = await Course.find();
  res.status(200).json({
    message: "get all courses",
    data: allCourses,
  });
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, instructorId } = req.body;
    const instructor = await Instructor.findOneBy({
      id: instructorId,
    });
    if (!instructor) {
      return req.res?.status(400).json({
        message: `can't found insturctor with id ${instructorId}`,
        data: null,
      });
    }
    const course = Course.create({
      name,
      instructor,
    });
    await course.save();
    return res.status(200).json({
      message: "successfully created new course",
      data: {
        id: course.id,
        name: course.name,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
        instructorId: course.instructor.id,
      },
    });
  } catch (error: any) {
    return res.status(404).json({
      message: error.message,
      data: { ...error },
    });
  }
});

router.delete("/:courseId", async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    if (courseId) {
      const course = await Course.findOne({ where: { id: courseId } });
      if (course) {
        await AppDataSource.createQueryBuilder()
          .delete()
          .from(Course)
          .where("id = :id", { id: courseId })
          .execute();
        res.status(200).json({
          message: `Course ${course.name} has been delete successfully`,
          data: {},
          status: 200,
        });
      } else {
        res.status(404).json({
          message: "Course not found",
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

export default router;
