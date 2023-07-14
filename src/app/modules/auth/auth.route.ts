import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/signup", AuthController.userSignUp);

router.post("/login", AuthController.userLogin);

router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
