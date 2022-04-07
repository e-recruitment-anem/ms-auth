"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const compression_1 = (0, tslib_1.__importDefault)(require("compression"));
const cors_1 = (0, tslib_1.__importDefault)(require("cors"));
const morgan_1 = (0, tslib_1.__importDefault)(require("morgan"));
const dotenv = (0, tslib_1.__importStar)(require("dotenv"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
dotenv.config();
// const isProduction = process.env.NODE_ENV === 'production'
// Logging
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('common'));
}
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
app.use('/api', routes_1.Router);
app.listen(3000, () => {
    console.log('server is listening to port 3000');
});
//# sourceMappingURL=app.js.map