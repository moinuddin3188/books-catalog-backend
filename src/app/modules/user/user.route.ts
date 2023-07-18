import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.get("/wishlist/:email", UserController.getWishList);
router.get("/my-list/:email", UserController.getMyList);
router.get("/:email", UserController.getSingleUser);

router.patch("/wishlist/:email", UserController.updateWishList);
router.patch("/my-list/:email", UserController.updateMyList);
router.patch("/update-status/:email", UserController.updateStatus);
router.patch("/delete-list/:email", UserController.deleteFromMyList);
router.patch("/delete-wishlist/:email", UserController.deleteFromWishlist);

export const UserRoutes = router;
