"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    bookId: {
        type: String,
        required: true,
        unique: true,
    },
    reviews: {
        type: [
            {
                user: {
                    type: mongoose_1.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                review: {
                    type: String,
                    required: true,
                },
                postedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        default: [],
    },
}, {
    timestamps: true,
});
exports.Review = (0, mongoose_1.model)("Review", reviewSchema);
