// import { authController } from "../controllers/auth.controllers";
import { agenciesController } from "@src/controllers";
import express from "express";

const router = express.Router();
router.post("/", agenciesController.createAgency);
router.patch("/:id", agenciesController.updateAgency);
router.get("/:id", agenciesController.getAgency);
router.delete("/:id", agenciesController.deleteAgency);
router.get("/", agenciesController.getAgencies);
router.get("/admin/:adminId/:agencyId", agenciesController.addAdminToAgency);
router.delete("/admin/:adminId", agenciesController.deleteAdminFromAgency);

export { router as agenciesRouter };
