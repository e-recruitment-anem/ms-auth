import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const { agency } = new PrismaClient();

const getHello = async (req: Request, res: Response) => {
  // const ag = await agency.create({
  //   data: {
  //     email: "agence@gmail.com",
  //     name: "agence",
  //     phoneNumber: "0558956964",
  //   },
  // });
  // const acc = await account.create({
  //   data: {
  //     email: "a.zitouni@esi-sba",
  //     password: "50504404",
  //     role: "ADMIN",
  //     agencyId: ag.id,
  //   },
  // });
  // res.send(acc);

  const agencies = await agency.findMany({
    where: { id: 3 },
    include: { accounts: true },
    // select: { email: true, accounts: true },
  });
  // agencies[0]
  // throw new Error("codeError");
  return res.status(200).send(agencies);
};

const login = async (req: Request, res: Response) => {};
const registerAdmin = async (req: Request, res: Response) => {};
const registerJobSeeker = async (req: Request, res: Response) => {};
const registerEmployer = async (req: Request, res: Response) => {};
const forgetPassword = async (req: Request, res: Response) => {};
const resetPassword = async (req: Request, res: Response) => {};

export const authController = {
  getHello,
  login,
  registerAdmin,
  registerEmployer,
  registerJobSeeker,
  forgetPassword,
  resetPassword,
};
