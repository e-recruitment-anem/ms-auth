import { authController } from "../controllers/auth.controllers";
import express from "express";

const router = express.Router();

router.get("/", authController.getHello);

export { router as authRouter };
