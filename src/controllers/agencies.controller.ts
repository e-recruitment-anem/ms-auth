import { Prisma } from "@prisma/client";
import { BadRequestException, ItemNotFoundException } from "../exceptions";
import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import { agenciesService } from "../services";

const getHello = async (req: Request, res: Response, next: NextFunction) => {
  res.send("hello wotld");
};

const createAgency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, phoneNumber } = req.body;
  const agency = await agenciesService.createAgency({
    name,
    email,
    phoneNumber,
  });
  res
    .status(200)
    .send({ message: "agency created successfully.", body: agency });
};

const updateAgency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, email, phoneNumber } = req.body;
  const agency = await agenciesService.findAgencyById(Number(id));
  if (_.isNull(agency)) next(new ItemNotFoundException());
  const updatedAgency = await agenciesService.updateAgency(Number(id), {
    name,
    email,
    phoneNumber,
  });
  res
    .status(200)
    .send({ message: "agency updated successfully", body: updatedAgency });
};

const getAgency = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const agency = await agenciesService.findAgencyById(Number(id));
  if (_.isNull(agency)) next(new ItemNotFoundException());
  res.status(200).send({ message: "agency item found", body: agency });
};

const deleteAgency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const agency = await agenciesService.findAgencyById(Number(id));
  if (_.isNull(agency)) next(new ItemNotFoundException());
  await agenciesService.deleteAgency(Number(id));
  res.status(200).send({ message: "agency deleted successfully.", body: null });
};

const getAgencies = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name = null,
    email = null,
    phoneNumber = null,
    page = 1,
    itemsPerPage = 50,
  } = req.query;
  let filter: Prisma.AgencyWhereInput;
  filter = {};

  if (!_.isNull(name)) {
    filter.name = {};
    filter.name.contains = String(name);
  }

  if (!_.isNull(email)) {
    filter.email = {};
    filter.email.contains = String(email);
  }

  if (!_.isNull(phoneNumber)) {
    filter.phoneNumber = {};
    filter.phoneNumber.contains = String(phoneNumber);
  }

  try {
    const agencies = await agenciesService.findAgencies(
      filter,
      Number(page),
      Number(itemsPerPage)
    );
    res.status(200).send({ message: "agencies list", body: agencies });
  } catch (error) {
    next(new BadRequestException(""));
  }
};

const addAdminToAgency = async (req: Request, res: Response) => {
  const { adminId, agencyId } = req.params;
  console.log(adminId, agencyId);
};

export const agenciesController = {
  createAgency,
  getHello,
  getAgency,
  getAgencies,
  updateAgency,
  deleteAgency,
  addAdminToAgency,
};
