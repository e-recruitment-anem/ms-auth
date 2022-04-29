import { ADMIN_TYPE, Prisma, Role, PrismaClient } from "@prisma/client";
import { BadRequestException, ItemNotFoundException } from "../exceptions";
import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import moment from "moment";
import { accountsService } from "../services";

const prisma = new PrismaClient();

const getHello = async (req: Request, res: Response) => {
  await prisma.account.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.agency.deleteMany();
  res.send("deleted db");
};

const deleteAccount = async (req: Request, res: Response) => {
  const { id } = req.params;
  await accountsService.deleteAccount(Number(id));
  res.status(200).send({ message: "account deleted successfully", body: null });
};

const getAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const admin = await accountsService.findAdminById(Number(id));
  if (_.isNull(admin)) next(new ItemNotFoundException());
  res.status(200).send({ message: "admin found", body: admin });
};

const getAdmins = async (req: Request, res: Response, next: NextFunction) => {
  const {
    agency = null,
    email = null,
    firstname = null,
    lastname = null,
    birthDate = null,
    birthDate_gte = null,
    birthDate_lte = null,
    phoneNumber = null,
    type = null,
    page = 1,
    itemsPerPage = 50,
  } = req.query;
  let filter: Prisma.AccountWhereInput = {};
  filter.role = Role.ADMIN;
  filter.admin = {};
  if (!_.isNull(agency)) {
    filter.agencyId = {};
    filter.agencyId.equals = Number(agency);
  }
  if (!_.isNull(email)) {
    filter.email = {};
    filter.email.contains = String(email);
  }
  if (!_.isNull(firstname)) {
    filter.admin.firstname = {};
    filter.admin.firstname.equals = String(firstname);
  }
  if (!_.isNull(lastname)) {
    filter.admin.lastname = {};
    filter.admin.lastname.contains = String(lastname);
  }
  if (!_.isNull(phoneNumber)) {
    filter.admin.phoneNumber = {};
    filter.admin.phoneNumber.contains = String(phoneNumber);
  }
  if (!_.isNull(type)) {
    filter.admin.type = ADMIN_TYPE[String(type)];
  }
  if (!_.isNull(birthDate)) {
    console.log(birthDate);

    filter.admin.birthDate = {};
    filter.admin.birthDate.equals = moment(String(birthDate)).toISOString();
  }
  if (!_.isNull(birthDate_gte) || !_.isNull(birthDate_lte)) {
    filter.admin.birthDate = {};
    if (!_.isNull(birthDate_gte))
      filter.admin.birthDate.gte = String(birthDate_gte);
    if (!_.isNull(birthDate_lte))
      filter.admin.birthDate.lte = String(birthDate_lte);
  }
  try {
    const admins = await accountsService.findAdmins(
      filter,
      Number(page),
      Number(itemsPerPage)
    );
    res.status(200).send({ message: "admins list", body: admins });
  } catch (error) {
    next(new BadRequestException(""));
  }
};

export const usersController = {
  getHello,
  deleteAccount,
  getAdmin,
  getAdmins,
};
