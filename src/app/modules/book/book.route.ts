import express from "express";
import { BookController } from "./book.controller";

const router = express.Router();

router.get("/:id", BookController.getSingleBook);

router.delete("/:id", BookController.deleteBook);

router.patch("/:id", BookController.updateBook);

router.post("/add-book", BookController.addBook);

router.get("/", BookController.getAllBook);

export const BookRoutes = router;
