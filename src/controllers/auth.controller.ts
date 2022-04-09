import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const { account } = new PrismaClient();

const getHello = async (req: Request, res: Response) => {
  // const ag = await agency.create({
  //   data: {
  //     email: "agence@gmail.com",
  //     name: "agence",
  //     phoneNumber: "055895696400",
  //   },
  // });
  try {
    const acc = await account.create({
      data: {
        email: "a.zitouuuusjsuni@esi-sba",
        password: "aaaaabbbbb",
        role: "ADMIN",
        agencyId: 9,
      },
    });
    res.send(acc);
  } catch (error) {
    console.log(error);
    res.send("error");
  }

  // const agencies = await agency.findMany({
  //   where: { id: 3 },
  //   include: { accounts: true },
  //   // select: { email: true, accounts: true },
  // });
  // agencies[0]
  // throw new Error("codeError");
  // return res.status(200).send(acc);
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
