import { Agency, PrismaClient } from "@prisma/client";
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

  const agencies: Agency[] = await agency.findMany({
    where: { id: 1 },
    include: { accounts: true },
  });
  // throw new Error("codeError");
  return res.status(200).send(agencies);
};

export const authController = {
  getHello,
};
