import { Request, Response } from "express";

const getHello = async (req: Request, res: Response) => {};
const deleteAccount = async (req: Request, res: Response) => {};
const getAdmin = async (req: Request, res: Response) => {};
const getAdmins = async (req: Request, res: Response) => {};

export const usersController = {
  getHello,
  deleteAccount,
  getAdmin,
  getAdmins,
};
