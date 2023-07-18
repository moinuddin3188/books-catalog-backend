"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleApiError_1 = __importDefault(require("../../../errors/handleApiError"));
const book_model_1 = require("./book.model");
const book_constants_1 = require("./book.constants");
const mongoose_1 = __importDefault(require("mongoose"));
const book_utils_1 = require("./book.utils");
const review_model_1 = require("../review/review.model");
const addBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.imageUrl) {
        payload.imageUrl = (0, book_utils_1.getBookImageUrl)();
    }
    let newBookAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const bookId = yield (0, book_utils_1.generateBookId)(payload.publicationYear);
        payload.id = bookId;
        const newBook = yield book_model_1.Book.create([payload], { session: session });
        if (!newBook.length) {
            throw new handleApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create book!");
        }
        newBookAllData = newBook[0];
        const reviewData = { bookId: newBookAllData.id, reviews: [] };
        const reviews = yield review_model_1.Review.create([reviewData], { session: session });
        if (!reviews.length) {
            throw new handleApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create review!");
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return newBookAllData;
});
const getRecentBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.Book.find({}).sort({ createdAt: -1 }).limit(10);
    return books;
});
const getAllBook = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, sortBy, sortOrder } = filters, filtersData = __rest(filters, ["searchTerm", "sortBy", "sortOrder"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_constants_1.bookSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: { $in: value },
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const allCows = yield book_model_1.Book.find(whereConditions).sort(sortConditions);
    return allCows;
});
const getSingleBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findOne({ id: payload });
    return book;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findOne({ id });
    if (!isExist) {
        throw new handleApiError_1.default(http_status_1.default.BAD_REQUEST, "Book doesn't exist");
    }
    const updatedBook = yield book_model_1.Book.findOneAndUpdate({ id }, payload, {
        new: true,
    });
    return updatedBook;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let deletedBook = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        deletedBook = yield book_model_1.Book.findOneAndDelete({ id }, { session });
        if (!deleteBook) {
            throw new handleApiError_1.default(http_status_1.default.BAD_REQUEST, "failed to delete");
        }
        const deleteReview = yield review_model_1.Review.findOneAndDelete({ id }, { session });
        if (!deleteReview) {
            throw new handleApiError_1.default(http_status_1.default.BAD_REQUEST, "failed to delete");
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        session.abortTransaction;
        session.endSession();
        throw error;
    }
    return deletedBook;
});
exports.BookService = {
    addBook,
    getAllBook,
    getRecentBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};
