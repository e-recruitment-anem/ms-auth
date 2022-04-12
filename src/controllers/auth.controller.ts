import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const { agency } = new PrismaClient();

const getHello = async (req: Request, res: Response) => {
  try {
    // await agency.create({
    //   data: {
    //     email: "aa",
    //     name: "aa",
    //     phoneNumber: "8888",
    //   },
    // });
    const agencies = await agency.findMany({
      // where: { id: 3 },
      include: { accounts: true },
      // select: { email: true, accounts: true },
    });

    res.status(200).send(agencies);
  } catch (error) {
    // console.log(error);
    res.send("error");
  }
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
