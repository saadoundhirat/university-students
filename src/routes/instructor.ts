import express, { Request, Response } from "express";
import { AppDataSource } from "../AppDataSource";
const router = express.Router();
import { Instructor } from "../entities/Instructor";

router.get("/", async (req, res) => {
  const allInstructors = await Instructor.find();
  res.status(200).json({
    message: "get all Instructors",
    data: allInstructors,
  });
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const instructor = Instructor.create({
      ...req.body,
    });
    await instructor.save();

    res.status(200).json({
      message: "create instructor",
      data: instructor,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
      data: { ...error },
    });

    process.on("uncaughtException", (error) => {
      console.error(error && error.stack);
      process.exit(1);
    });
  }
});

router.delete("/:instructourId", async (req: Request, res: Response) => {
  try {
    const { instructourId } = req.params;
    if (instructourId) {
      const instructour = await Instructor.findOne({
        where: { id: instructourId },
      });
      if (instructour) {
        await AppDataSource.createQueryBuilder()
          .delete()
          .from(Instructor)
          .where("id = :id", { id: instructourId })
          .execute();
        res.status(200).json({
          message: `Instructor ${
            instructour.firstName + "" + instructour.lastName
          } has been delete successfully`,
          data: {},
          status: 200,
        });
      } else {
        res.status(404).json({
          message: "Instructor not found",
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
