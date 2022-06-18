import { checkAdminRole, checkRole, isAuth } from "../middlewares";
import express from "express";
import { authController } from "../controllers";
import validate from "../middlewares/validateResource.middleware";
import {
  CreateAdminRequest,
  CreateEmployerRequest,
  CreateJobSeekerRequest,
} from "../schemas/auth.schema";
// import { Role } from "@prisma/client";

const router = express.Router();

router.get("/", isAuth, authController.getAuth);
router.post(
  "/",
  isAuth,
  checkRole(["ADMIN"]),
  checkAdminRole(["AGENCY_ADMIN"]),
  authController.getHello
);
router.post("/login", authController.login);
router.get("/forget-password/:email", authController.forgetPassword);
router.post("/reset-password/:token", authController.resetPassword);
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
router.get('/get-auth', isAuth, authController.getAuth)
router.get("/verify-account/:token", authController.verifyAccount);

export { router as authRouter };
