import { NextFunction, Request, Response } from "express";
import { generate } from "generate-password";
import { accountsService } from "../services/index";
import {
  UserWithThatEmailAlreadyExistsException,
  WrongCredentialsException,
} from "../exceptions/index";
import bcryptHelper from "../helpers/bcrypt.helper";
import emailHelper from "../helpers/email.helper";
import jwtHelper from "../helpers/jwt.helper";
import { Account } from "@prisma/client";
import { createClient } from "redis";

// const redisURL = process.env.REDIS_URL;

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

const getHello = async (req: Request, res: Response, next: NextFunction) => {
  const accounts: Account[] = await accountsService.findAccounts();
  // emailHelper.sendEmail("hee");
  await client.set("aymen", "zitouni");
  await client.set("aymennn", "zitounnni");
  const value = await client.get("aymennnnn");
  console.log(
    generate({ length: 10, lowercase: true, uppercase: true, numbers: true })
  );

  console.log(value);

  res.send({
    accounts,
    value: generate({
      length: 10,
      lowercase: true,
      uppercase: true,
      numbers: true,
    }),
  });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const account = await accountsService.findAccountByEmail(email);
  if (!account) {
    next(new WrongCredentialsException());
  }
  const isPasswordMatching = bcryptHelper.comparePassword(
    password,
    account.password
  );
  if (!isPasswordMatching) {
    next(new WrongCredentialsException());
  }
  account.password = undefined;
  const tokenData = await jwtHelper.createToken(account);
  res.setHeader(
    "Set-Cookie",
    `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`
  );
  res.status(200).send();
};

const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, agencyId, firstname, lastname, birthDate, phoneNumber, type } =
    req.body;

  // verify if there an account with this email
  let account = await accountsService.findAccountByEmail(email);
  if (account) {
    next(new UserWithThatEmailAlreadyExistsException(email));
  }

  // generate &  crypt password
  const password = generate({
    length: 10,
    lowercase: true,
    uppercase: true,
    numbers: true,
  });
  const hashedPassword = bcryptHelper.hashPassword(password);

  // create admin account
  account = await accountsService.createAdmin({
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
  await client.set(tokenData.token, String(account.id));

  // Send verfication email
  await emailHelper.sendAdminCreationEmail(email, password, tokenData.token);

  account.password = undefined;
  res
    .status(200)
    .send({ message: "admin created successfuly;", body: account });
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
  await emailHelper.sendVerificationEmail(tokenData.token);

  account.password = undefined;
  res
    .status(200)
    .send({ message: "job-seeker created successfuly;", body: account });
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
  await emailHelper.sendVerificationEmail(tokenData.token);

  account.password = undefined;
  res
    .status(200)
    .send({ message: "employer created successfuly;", body: account });
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

const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  const accountId = await client.get(token);
  if (!accountId) {
    // throw an error
  }
  const { email } = await accountsService.findAccountById(Number(accountId));
  const verifiedToken = await jwtHelper.verifyToken(token);
  if (email !== verifiedToken) {
    // throw an error
  }
  console.log(verifiedToken);
  console.log(accountId);
  // set email_verified to true

  res
    .status(200)
    .send({ message: "email was verified successfully", body: null });
};

export const authController = {
  getHello,
  login,
  registerAdmin,
  registerEmployer,
  registerJobSeeker,
  forgetPassword,
  resetPassword,
  verifyAccount,
};
