import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { accountsService } from "../services";
import { UserWithThatEmailAlreadyExistsException } from "../exceptions";

const prisma = new PrismaClient();

const getHello = async (req: Request, res: Response, next: NextFunction) => {
  res.send("OK");
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  accountsService.login();
  res.status(200).send();
};

const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const account = await prisma.account.findUnique({ where: { email: email } });
  if (account) {
    next(new UserWithThatEmailAlreadyExistsException(email));
  }
  //   await prisma.account.create({
  //     data: {
  //       email,
  //       password: "ahhhh",
  //       role: Role.ADMIN,
  //       admin : {
  //         create : {
  // birthDate:
  //         }
  //       },
  //       agencyId: 1,
  //     },
  //   });

  res.send("success");
};

const registerJobSeeker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const registerEmployer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const authController = {
  getHello,
  login,
  registerAdmin,
  registerEmployer,
  registerJobSeeker,
  forgetPassword,
  resetPassword,
};
