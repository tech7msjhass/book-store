import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { bookRouter } from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN stack project");
});

//Route for  Books
app.use("/books", bookRouter);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Server Started at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
