"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const { agency } = new client_1.PrismaClient();
const getHello = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        // await agency.create({
        //   data: {
        //     email: "aa",
        //     name: "aa",
        //     phoneNumber: "8888",
        //   },
        // });
        const agencies = yield agency.findMany({
            // where: { id: 3 },
            include: { accounts: true },
            // select: { email: true, accounts: true },
        });
        res.status(200).send(agencies);
    }
    catch (error) {
        // console.log(error);
        res.send("error");
    }
});
const login = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { });
const registerAdmin = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { });
const registerJobSeeker = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { });
const registerEmployer = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { });
const forgetPassword = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { });
const resetPassword = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { });
exports.authController = {
    getHello,
    login,
    registerAdmin,
    registerEmployer,
    registerJobSeeker,
    forgetPassword,
    resetPassword,
};
//# sourceMappingURL=auth.controller.js.map