import "dotenv/config";
import express from "express";
import { createConnection } from "typeorm";
const dotenv = require("dotenv");
const cors = require("cors");
// const morgan = require("morgan"); // HTTP request logger middleware for node.js
import "reflect-metadata"
import { AppDataSource } from './src/data-source';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

//middleware
// app.use(morgan("combined"));
app.use(cors()); // to accept requests from different origins
app.use(express.json()); // allows us to parse JSON data in the request body
app.use(express.urlencoded({ extended: true })); // allows us to parse URL encoded data in the request body

(async () => {
  try {
    app.get("/", (req, res) => {
      res.status(200).send("THE TESTING ROUTER IS WORKIING");
    });
    app.all("*", (req, res) => {
      res.status(404).json({
        message: "The requested URL was not found on the server.",
        data: {},
        status: 404,
      });
    });

    AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

    //! start the server
    app.listen(PORT, async () => {
      console.log(
        `SERVER IS UP AND RUNNING ON PORT : http://localhost:${PORT}`
      );
    });
  } catch (error: any) {
    console.log(error);
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
