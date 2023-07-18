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
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const result = yield user_service_1.UserService.getSingleUser(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User retrieved successfully!",
        data: result,
    });
}));
const getWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const result = yield user_service_1.UserService.getWishList(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Wishlist retrieved successfully!",
        data: result,
    });
}));
const getMyList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const result = yield user_service_1.UserService.getMyList(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "My list retrieved successfully!",
        data: result,
    });
}));
const updateWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = __rest(req.body, []);
    const email = req.params.email;
    const result = yield user_service_1.UserService.updateWishList(email, body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Wishlist updated successfully!",
        data: result,
    });
}));
const updateMyList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = __rest(req.body, []);
    const email = req.params.email;
    const result = yield user_service_1.UserService.updateMyList(email, body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "My list updated successfully!",
        data: result,
    });
}));
const updateStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = __rest(req.body, []);
    const email = req.params.email;
    const result = yield user_service_1.UserService.updateStatus(email, body === null || body === void 0 ? void 0 : body.id, body === null || body === void 0 ? void 0 : body.status);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "My list updated successfully!",
        data: result,
    });
}));
const deleteFromMyList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = __rest(req.body, []);
    const email = req.params.email;
    const result = yield user_service_1.UserService.deleteFromMyList(email, body === null || body === void 0 ? void 0 : body.book);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "My list updated successfully!",
        data: result,
    });
}));
const deleteFromWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = __rest(req.body, []);
    const email = req.params.email;
    const result = yield user_service_1.UserService.deleteFromWishlist(email, body === null || body === void 0 ? void 0 : body.book);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "My list updated successfully!",
        data: result,
    });
}));
exports.UserController = {
    getSingleUser,
    getWishList,
    getMyList,
    updateWishList,
    updateMyList,
    updateStatus,
    deleteFromMyList,
    deleteFromWishlist
};
