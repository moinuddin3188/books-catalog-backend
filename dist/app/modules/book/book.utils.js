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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookImageUrl = exports.generateBookId = exports.findLastBookId = void 0;
const book_model_1 = require("./book.model");
const findLastBookId = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = yield book_model_1.Book.findOne({}, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    return (bookId === null || bookId === void 0 ? void 0 : bookId.id) ? bookId.id.substring(6) : undefined;
});
exports.findLastBookId = findLastBookId;
const generateBookId = (publicationYear) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastBookId)()) || (0).toString().padStart(4, '0');
    let incrementedId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementedId = `BK${publicationYear}${incrementedId}`;
    return incrementedId;
});
exports.generateBookId = generateBookId;
const getBookImageUrl = () => {
    const randomNumber = Math.round(Math.random() * 90) + 10;
    return `https://ia800606.us.archive.org/view_archive.php?archive=/32/items/olcovers642/olcovers642-L.zip&file=64294${randomNumber}-L.jpg`;
};
exports.getBookImageUrl = getBookImageUrl;
