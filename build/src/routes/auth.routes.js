"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const tslib_1 = require("tslib");
const controllers_1 = require("../controllers");
const express_1 = tslib_1.__importDefault(require("express"));
const router = express_1.default.Router();
exports.authRouter = router;
router.get("/", controllers_1.authController.getHello);
router.post("/login", controllers_1.authController.login);
router.get("/forget-password", controllers_1.authController.forgetPassword);
router.post("/reset-password", controllers_1.authController.resetPassword);
router.post("/register-job-seeker", controllers_1.authController.registerJobSeeker);
router.post("/register-employer", controllers_1.authController.registerEmployer);
router.post("/register-admin", controllers_1.authController.registerAdmin);
//# sourceMappingURL=auth.routes.js.map