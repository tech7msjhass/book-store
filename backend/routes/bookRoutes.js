import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../controller/bookController.js";

export const bookRouter = express.Router();

bookRouter.get("/", getBooks);

bookRouter.get("/:id", getBook);

bookRouter.post("/", createBook);

bookRouter.put("/:id", updateBook);

bookRouter.delete("/:id", deleteBook);
