import { authController } from "../controllers";
import express from "express";
import validate from "../middlewares/validateResource.middleware";
import { testSchema } from "../schemas/auth.schema";

const router = express.Router();

router.post("/", validate(testSchema), authController.getHello);
router.get("/login", authController.login);
router.post("/login", authController.login);
router.get("/forget-password", authController.forgetPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/register-job-seeker", authController.registerJobSeeker);
router.post("/register-employer", authController.registerEmployer);
router.post("/register-admin", authController.registerAdmin);

export { router as authRouter };
