import { NextFunction, Request, Response } from "express";
import { generate } from "generate-password";
import _ from "lodash";
import { accountsService, agenciesService } from "../services/index";
import {
  UserWithThatEmailAlreadyExistsException,
  WrongCredentialsException,
  InvalidTokenException,
  BadRequestException,
} from "../exceptions/index";
import bcryptHelper from "../helpers/bcrypt.helper";
import emailHelper from "../helpers/email.helper";
import jwtHelper from "../helpers/jwt.helper";
import { Account } from "@prisma/client";
import redisHelper from "../helpers/redis.helper";
import brokerHelper from "../helpers/broker.helper";

const getHello = async (req: Request, res: Response, next: NextFunction) => {
  const accounts: Account[] = await accountsService.findAccounts();
  // console.log(req.headers.cookie);
  // console.log(moment("2022-08-01").toISOString());
  // await redisHelper.setItem("aymen", "zitouni");

  // emailHelper.sendEmail("hee");

  // await redisHelper.setItem("aymennn", "zitounnni");
  // const value = await redisHelper.getItem("aymennnnn");
  // console.log(
  //   generate({ length: 10, lowercase: true, uppercase: true, numbers: true })
  // );

  // console.log(value);

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

const getAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { account } = res.locals;
  res.send({ message: "account found.", body: { ...account } });
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
  res.cookie("Bearer", tokenData.token);
  res
    .status(200)
    .send({ message: "logged in successfully", body: { ...account } });
};

const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, agencyId, firstname, lastname, birthDate, phoneNumber, type } =
    req.body;

  // verify if this agency exists
  const agency = await agenciesService.findAgencyById(Number(agencyId));
  if (_.isNull(agency))
    next(new BadRequestException("this agency doesn't exist."));

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
  await redisHelper.setItem(tokenData.token, String(account.id));

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
    firstname,
    lastname,
    gender,
    birthDate,
    birthPlace,
    address,
    postalCode,
    residenceCity,
    nationality,
    phoneNumber,
  } = req.body;

  // verify if this agency exists
  const agency = await agenciesService.findAgencyById(Number(agencyId));
  if (_.isNull(agency))
    return next(new BadRequestException("this agency doesn't exist."));

  // verify if there an account with this email
  let account = await accountsService.findAccountByEmail(email);
  if (account) {
    return next(new UserWithThatEmailAlreadyExistsException(email));
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
  await brokerHelper.sendMessage(
    "job-seekers.create-job-seeker",
    JSON.stringify({
      idJobSeeker: account.id,
      firstName: firstname,
      lastName: lastname,
      gender,
      birthDate,
      birthPlace,
      address,
      postalCode,
      residenceCity,
      nationality,
      phoneNumber,
    })
  );

  // generate token & store it in the cache
  const tokenData = await jwtHelper.createToken(email);

  // Send verfication email
  await emailHelper.sendVerificationEmail(tokenData.token);

  account.password = undefined;
  return res
    .status(200)
    .send({ message: "job-seeker created successfuly;", body: account });
};

const registerEmployer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, agencyId } = req.body;

  // verify if this agency exists
  const agency = await agenciesService.findAgencyById(Number(agencyId));
  if (_.isNull(agency))
    next(new BadRequestException("this agency doesn't exist."));

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
) => {
  const { email } = req.params;
  const account = await accountsService.findAccountByEmail(email);
  if (_.isNull(account) || _.isUndefined(account)) {
    next(new WrongCredentialsException());
  }
  const tokenData = await jwtHelper.createToken({
    id: account.id,
    email: account.email,
  });

  redisHelper.setItem(`forget-password--${tokenData.token}`, account.email);
  emailHelper.sendForgetPasswordEmail(email, tokenData.token);
  res.status(200).send({
    message: "reset password token was sent successfully",
    body: null,
  });
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  const { password, passwordConfirmation } = req.body;
  const redisKey = `forget-password--${token}`;
  const email = await redisHelper.getItem(redisKey);
  if (_.isNull) next(new InvalidTokenException());
  try {
    const verifiedToken = await jwtHelper.verifyToken(token);
    if (verifiedToken["email"] !== email) next(new InvalidTokenException());
  } catch (error) {
    next(new InvalidTokenException());
  }
  if (password !== passwordConfirmation) next(new WrongCredentialsException());
  const hashedPassword = bcryptHelper.hashPassword(password);
  await accountsService.findAndUpdatePasswordByEmail(email, hashedPassword);
  await redisHelper.deleteItem(redisKey);
  res.status(200).send({
    message: "password was updated successfully",
    bady: null,
  });
};

const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  const accountId = await redisHelper.getItem(token);
  if (!accountId) {
    next(new InvalidTokenException());
  }
  const { email } = await accountsService.findAccountById(Number(accountId));
  const verifiedToken = await jwtHelper.verifyToken(token);
  if (email !== verifiedToken) {
    next(new InvalidTokenException());
  }
  // set email_verified to true

  res
    .status(200)
    .send({ message: "email was verified successfully", body: null });
};

export const authController = {
  getHello,
  login,
  getAuth,
  registerAdmin,
  registerEmployer,
  registerJobSeeker,
  forgetPassword,
  resetPassword,
  verifyAccount,
};
