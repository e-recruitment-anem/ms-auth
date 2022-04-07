import express from "express";
import { agenciesRouter } from "./agencies.routes";
import { authRouter } from "./auth.routes";
import { usersRouter } from "./users.routes";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/auth", agenciesRouter);

export { router as Router };
