import express from "express";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.get("/:id", ReviewController.getReview)

router.patch("/:id", ReviewController.postReview)


export const ReviewRoutes = router;