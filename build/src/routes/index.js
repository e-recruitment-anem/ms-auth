"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const router = express_1.default.Router();
exports.Router = router;
router.get('/', (req, res) => {
    return res.send('hello from express');
});
//# sourceMappingURL=index.js.map