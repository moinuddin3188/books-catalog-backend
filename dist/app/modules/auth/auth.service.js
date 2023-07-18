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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleApiError_1 = __importDefault(require("../../../errors/handleApiError"));
const user_model_1 = require("../user/user.model");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const userSignUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.role = "user";
    const user = yield user_model_1.User.create(payload);
    if (!user) {
        throw new handleApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to sign up!");
    }
    return user;
});
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: userEmail, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(userEmail);
    if (!isUserExist) {
        throw new handleApiError_1.default(http_status_1.default.NOT_FOUND, "User doesn't exist");
    }
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new handleApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password or phone number is not correct");
    }
    // create access token and refresh token
    const { email, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        email,
        role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({
        email,
        role,
    }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new handleApiError_1.default(http_status_1.default.FORBIDDEN, "Token is invalid");
    }
    const { email } = verifiedToken;
    const isUserExist = yield user_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new handleApiError_1.default(http_status_1.default.NOT_FOUND, "User doesn't exist");
    }
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        email: isUserExist.email,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    userSignUp,
    userLogin,
    refreshToken,
};
