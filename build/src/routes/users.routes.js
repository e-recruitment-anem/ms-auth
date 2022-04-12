"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const tslib_1 = require("tslib");
const controllers_1 = require("../controllers");
const express_1 = tslib_1.__importDefault(require("express"));
const router = express_1.default.Router();
exports.usersRouter = router;
// delete account
router.delete("/:id", controllers_1.usersController.deleteAccount);
router.get("/admins", controllers_1.usersController.getAdmins);
router.get("/admins/:id", controllers_1.usersController.getAdmin);
// sign admin as agency manager
router.post("/admins/agency", controllers_1.usersController.getHello);
// unsign admin as agency manager
router.delete("/admins/agency", controllers_1.usersController.getHello);
//# sourceMappingURL=users.routes.js.map