"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.get("/recent-books", book_controller_1.BookController.getRecentBooks);
router.get("/:id", book_controller_1.BookController.getSingleBook);
router.get("/", book_controller_1.BookController.getAllBook);
router.delete("/:id", book_controller_1.BookController.deleteBook);
router.patch("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), book_controller_1.BookController.updateBook);
router.post("/add-book", (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), book_controller_1.BookController.addBook);
exports.BookRoutes = router;
