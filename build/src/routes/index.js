"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const agencies_routes_1 = require("./agencies.routes");
const auth_routes_1 = require("./auth.routes");
const users_routes_1 = require("./users.routes");
const router = express_1.default.Router();
exports.Router = router;
router.use("/auth", auth_routes_1.authRouter);
router.use("/users", users_routes_1.usersRouter);
router.use("/auth", agencies_routes_1.agenciesRouter);
//# sourceMappingURL=index.js.map