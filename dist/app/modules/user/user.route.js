"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get("/wishlist/:email", user_controller_1.UserController.getWishList);
router.get("/my-list/:email", user_controller_1.UserController.getMyList);
router.get("/:email", user_controller_1.UserController.getSingleUser);
router.patch("/wishlist/:email", user_controller_1.UserController.updateWishList);
router.patch("/my-list/:email", user_controller_1.UserController.updateMyList);
router.patch("/update-status/:email", user_controller_1.UserController.updateStatus);
router.patch("/delete-list/:email", user_controller_1.UserController.deleteFromMyList);
router.patch("/delete-wishlist/:email", user_controller_1.UserController.deleteFromWishlist);
exports.UserRoutes = router;
