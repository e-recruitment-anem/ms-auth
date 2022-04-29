import { Request, Response } from "express";

const getHello = (req: Request, res: Response) => {
  res.send("hello wotld");
};

const createAgency = (req: Request, res: Response) => {};
const updateAgency = (req: Request, res: Response) => {};
const getAgency = (req: Request, res: Response) => {};
const deleteAgency = (req: Request, res: Response) => {};
const getAgencies = (req: Request, res: Response) => {};
const addAdminToAgency = (req: Request, res: Response) => {};

export const agenciesController = {
  createAgency,
  getHello,
  getAgency,
  getAgencies,
  updateAgency,
  deleteAgency,
  addAdminToAgency,
};
