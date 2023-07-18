import express from "express";
import { BookController } from "./book.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.get("/recent-books", BookController.getRecentBooks);
router.get("/:id", BookController.getSingleBook);
router.get("/", BookController.getAllBook);

router.delete("/:id", BookController.deleteBook);

router.patch("/:id", auth(ENUM_USER_ROLE.USER), BookController.updateBook);

router.post("/add-book", auth(ENUM_USER_ROLE.USER), BookController.addBook);



export const BookRoutes = router;
