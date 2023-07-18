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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_constants_1 = require("./user.constants");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    role: {
        type: String,
        enum: user_constants_1.userRole,
        required: true,
    },
    avatar: {
        type: String,
    },
    wishList: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Book",
            default: [],
        },
    ],
    myList: [
        {
            book: {
                type: mongoose_1.Types.ObjectId,
                ref: "Book",
            },
            status: {
                type: String,
                enum: ["reading", "will read", "finished reading"],
                default: "will read"
            },
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
userSchema.statics.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ email: email }, { password: 1, role: 1, email: 1 });
    });
};
userSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        //hashing password
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_round));
        next();
    });
});
userSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.password = "Not accessible";
        next();
    });
});
exports.User = (0, mongoose_1.model)("User", userSchema);
