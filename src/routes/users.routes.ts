import { usersController } from "../controllers";
import express from "express";

const router = express.Router();
// delete account

router.delete("/:id", usersController.deleteAccount);

router.get("/admins", usersController.getAdmins);
router.get("/admins/:id", usersController.getAdmin);

// sign admin as agency manager
router.post("/admins/agency", usersController.getHello);
// unsign admin as agency manager
router.delete("/admins/agency", usersController.getHello);

export { router as usersRouter };
