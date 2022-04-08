import { authController } from "../controllers";
import express from "express";

const router = express.Router();

router.get("/", authController.getHello);
router.post("/login", authController.login);
router.get("/forget-password", authController.forgetPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/register-job-seeker", authController.registerJobSeeker);
router.post("/register-employer", authController.registerEmployer);
router.post("/register-admin", authController.registerAdmin);

export { router as authRouter };
