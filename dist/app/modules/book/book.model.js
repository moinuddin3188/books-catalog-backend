"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    publicationYear: {
        type: Number,
        required: true,
    },
    genre: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
