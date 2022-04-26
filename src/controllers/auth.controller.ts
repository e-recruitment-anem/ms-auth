import { NextFunction, Request, Response } from "express";
import { accountsService } from "../services/index";
import { UserWithThatEmailAlreadyExistsException } from "../exceptions/index";
import bcryptHelper from "../helpers/bcrypt.helper";
import emailHelper from "../helpers/email.helper";
import jwtHelper from "../helpers/jwt.helper";
import { Account } from "@prisma/client";

const getHello = async (req: Request, res: Response, next: NextFunction) => {
  const accounts: Account[] = await accountsService.findAccounts();
  res.send(accounts);
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send();
};

const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    email,
    password,
    agencyId,
    firstname,
    lastname,
    birthDate,
    phoneNumber,
    type,
  } = req.body;

  // verify if there an account with this email
  let account = await accountsService.findAccountByEmail(email);
  if (account) {
    next(new UserWithThatEmailAlreadyExistsException(email));
  }

  // crypt password
  const hashedPassword = bcryptHelper.hashPassword(password);

  // create admin account
  await accountsService.createAdmin({
    email,
    password: hashedPassword,
    agencyId,
    firstname,
    lastname,
    birthDate,
    phoneNumber,
    type,
  });

  // generate token & store it in the cache
  const tokenData = await jwtHelper.createToken(email);

  console.log(tokenData);

  // Send verfication email
  await emailHelper.sendEmail(tokenData.token);

  res.status(200).send("success");
};

const registerJobSeeker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    email,
    password,
    agencyId,
    // firstname,
    // lastname,
    // birthDate,
    // phoneNumber,
    // type,
  } = req.body;

  // verify if there an account with this email
  let account = await accountsService.findAccountByEmail(email);
  if (account) {
    next(new UserWithThatEmailAlreadyExistsException(email));
  }

  // crypt password
  const hashedPassword = bcryptHelper.hashPassword(password);

  // create admin account
  account = await accountsService.createJobSeeker({
    email,
    password: hashedPassword,
    agencyId,
  });

  // push job-seeker-account creation to kafka broker
  // account.id

  // generate token & store it in the cache
  const tokenData = await jwtHelper.createToken(email);

  // Send verfication email
  await emailHelper.sendEmail(tokenData.token);

  res.status(200).send("success");
};

const registerEmployer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, agencyId } = req.body;

  // verify if there an account with this email
  let account = await accountsService.findAccountByEmail(email);
  if (account) {
    next(new UserWithThatEmailAlreadyExistsException(email));
  }

  // crypt password
  const hashedPassword = bcryptHelper.hashPassword(password);

  // create admin account
  account = await accountsService.createEmployer({
    email,
    password: hashedPassword,
    agencyId,
  });

  // push employer-account creation to kafka broker
  // account.id

  // generate token & store it in the cache
  const tokenData = await jwtHelper.createToken(email);

  // Send verfication email
  await emailHelper.sendEmail(tokenData.token);

  res.status(200).send("success");
};

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
