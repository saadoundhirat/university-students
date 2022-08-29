// import * as dotenv from "dotenv";
require("dotenv").config();
import express from "express";
var cors = require("cors");
import morgan from "morgan"; // HTTP request logger middleware for node.js
import "reflect-metadata";
import { AppDataSource } from "./src/AppDataSource";
import StudentRouter from "./src/routes/student";
import CourseRouter from "./src/routes/course";
import InstructorRouter from "./src/routes/instructor";
const routerPreFix = "/api/v1";

const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(morgan("combined"));
app.use(cors()); // to accept requests from different origins
app.use(express.json()); // allows us to parse JSON data in the request body
app.use(express.urlencoded({ extended: true })); // allows us to parse URL encoded data in the request body

(async () => {
  try {
    app.get("/", (req, res) => {
      res.status(200).send("Welcome to the university API");
    });
    app.use(`${routerPreFix}/student`, StudentRouter);
    app.use(`${routerPreFix}/course`, CourseRouter);
    app.use(`${routerPreFix}/instructor`, InstructorRouter);
    app.all("*", (req, res) => {
      res.status(404).json({
        message: "The requested URL was not found on the server.",
        data: {},
        status: 404,
      });
    });

    //! start the server
    app.listen(PORT, async () => {
      console.log(
        `SERVER IS UP AND RUNNING ON PORT : http://localhost:${PORT}`
      );
      await AppDataSource.initialize()
        .then(() => {
          console.log("Data Source has been initialized!");
        })
        .catch((error) => {
          console.error("Error during Data Source initialization", error);
        });
    });
  } catch (error: any) {
    app.all("*", (req, res) => {
      res.status(500).json({
        message: "Internal Server Error",
        data: {},
        status: 500,
      });
    });
    throw new Error(error);
  }
})();
