import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IBook } from "./book.interface";
import httpStatus from "http-status";
import { BookService } from "./book.service";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constants";

const addBook = catchAsync(async (req: Request, res: Response) => {
  const { ...book } = req.body;

  const result = await BookService.addBook(book);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book added successfully!",
    data: result,
  });
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const query = pick(req.query, bookFilterableFields);

  const filters = { ...query };

  const result = await BookService.getAllBook(filters);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully!",
    data: result,
  });
});

const getRecentBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getRecentBooks();

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully!",
    data: result,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.getSingleBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully!",
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updatedData } = req.body;

  const result = await BookService.updateBook(id, updatedData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully!",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.deleteBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully!",
    data: result,
  });
});

export const BookController = {
  addBook,
  getAllBook,
  getRecentBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
