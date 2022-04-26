import { Account, PrismaClient, Role } from "@prisma/client";
import HttpException from "../exceptions/http.exception";
const prisma = new PrismaClient();
// const editPassword = async () => {};
const login = async () => {
  throw new HttpException(400, "aa", "bb");
};

const findAccountByEmail = async (email: string) => {
  let account = await prisma.account.findUnique({ where: { email } });
  return account;
};

const createAdmin = async (admin) => {
  const {
    email,
    password,
    agencyId,
    firstname,
    lastname,
    birthDate,
    phoneNumber,
    type,
  } = admin;

  await prisma.account.create({
    data: {
      email,
      password,
      role: Role.ADMIN,

      admin: {
        create: {
          firstname,
          lastname,
          birthDate,
          phoneNumber,
          type,
        },
      },
      agency: {
        connect: {
          id: agencyId,
        },
      },
    },
  });
};

const createJobSeeker = async (jobSeeker) => {
  const { email, password, agencyId } = jobSeeker;

  const account = await prisma.account.create({
    data: {
      email,
      password,
      role: Role.JOB_SEKER,
      agency: {
        connect: {
          id: agencyId,
        },
      },
    },
  });
  return account;
};

const createEmployer = async (jobSeeker) => {
  const { email, password, agencyId } = jobSeeker;

  const account = await prisma.account.create({
    data: {
      email,
      password,
      role: Role.EMPLOYER,
      agency: {
        connect: {
          id: agencyId,
        },
      },
    },
  });
  return account;
};

const findAccounts = async (): Promise<Account[]> => {
  const accounts = await prisma.account.findMany();
  return accounts;
};
export const accountsService = {
  login,
  findAccountByEmail,
  findAccounts,
  createAdmin,
  createJobSeeker,
  createEmployer,
};
