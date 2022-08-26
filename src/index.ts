import "dotenv/config";
import express from "express";
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan"); // HTTP request logger middleware for node.js

dotenv.config();
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
      res.status(200).send("THE TESTING ROUTER IS WORKIING");
    });
    app.all("*", (req, res) => {
      res.status(404).json({
        message: "The requested URL was not found on the server.",
        data: {},
        status: 404,
      });
    });

    //! start the server
    app.listen(PORT, () => {
      console.log(`SERVER IS UP AND RUNNING ON PORT : http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.log(error);
  }
})();
