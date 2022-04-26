import { authController } from "../controllers";
import express from "express";
import validate from "../middlewares/validateResource.middleware";
import {
  CreateAdminRequest,
  CreateEmployerRequest,
  CreateJobSeekerRequest,
} from "../schemas/auth.schema";

const router = express.Router();

router.post("/", authController.getHello);
router.post("/login", authController.login);
router.get("/forget-password", authController.forgetPassword);
router.post("/reset-password", authController.resetPassword);
router.post(
  "/register-job-seeker",
  validate(CreateJobSeekerRequest),
  authController.registerJobSeeker
);

router.post(
  "/register-employer",
  validate(CreateEmployerRequest),
  authController.registerEmployer
);

router.post(
  "/register-admin",
  validate(CreateAdminRequest),
  authController.registerAdmin
);

router.get("/verify-account/:token", authController.verifyAccount);

export { router as authRouter };
