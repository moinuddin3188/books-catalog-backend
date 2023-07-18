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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleApiError_1 = __importDefault(require("../../../errors/handleApiError"));
const user_model_1 = require("./user.model");
const getSingleUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload });
    if (!user) {
        throw new handleApiError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't Exist!");
    }
    return user;
});
const getWishList = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload }).populate("wishList");
    if (!user) {
        throw new handleApiError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't Exist!");
    }
    return user;
});
const getMyList = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload }).populate("myList.book");
    if (!user) {
        throw new handleApiError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't Exist!");
    }
    return user;
});
const updateWishList = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndUpdate({ email }, {
        $addToSet: { wishList: payload.book },
    }, { new: true });
    return user;
});
const updateMyList = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndUpdate({ email, "myList.book": { $ne: payload.book } }, {
        $addToSet: {
            myList: {
                $each: [payload],
            },
        },
    }, { new: true }).populate("myList");
    return user;
});
const updateStatus = (email, id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndUpdate({ email, "myList._id": id }, { $set: { "myList.$.status": status } }, { new: true });
    return user;
});
const deleteFromMyList = (email, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndUpdate({ email }, {
        $pull: { myList: { book: bookId } },
    }, { new: true }).populate("myList");
    return user;
});
const deleteFromWishlist = (email, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndUpdate({ email }, {
        $pull: { wishList: { $in: [bookId] } },
    }, { new: true }).populate("myList");
    return user;
});
exports.UserService = {
    getSingleUser,
    getWishList,
    getMyList,
    updateWishList,
    updateMyList,
    updateStatus,
    deleteFromMyList,
    deleteFromWishlist
};
