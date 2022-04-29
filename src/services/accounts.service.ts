import {
  Account,
  Prisma,
  PrismaClient,
  // PrismaPromise,
  Role,
} from "@prisma/client";

const prisma = new PrismaClient();

const findAccountByEmail = async (email: string) => {
  let account = await prisma.account.findUnique({ where: { email } });

  return account;
};

const findAccountById = async (id: number) => {
  let account = await prisma.account.findUnique({ where: { id } });
  account.password = undefined;

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

  const account = await prisma.account.create({
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
  account.password = undefined;

  return account;
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
  account.password = undefined;

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
  account.password = undefined;
  return account;
};

const findAccounts = async (): Promise<Account[]> => {
  // await prisma.account.deleteMany();
  const accounts = await prisma.account.findMany();

  return accounts;
};

const findAndUpdatePasswordByEmail = async (
  email: string,
  hashedPassword: string
) => {
  return await prisma.account.update({
    where: { email },
    data: { password: hashedPassword },
  });
};

const findAdminById = async (id: number) => {
  let account = await prisma.account.findUnique({
    where: { id },
    include: { admin: true },
  });
  account = { ...account, ...account.admin };
  account.admin = undefined;
  return account;
};

const findAdmins = async (
  filter: Prisma.AccountWhereInput,
  page: number = 1,
  itemsPerPage: number = 50
) => {
  const admins = await prisma.account.findMany({
    where: { ...filter },
    include: { admin: true },
    take: itemsPerPage,
    skip: itemsPerPage * (page - 1),
  });
  const count = await prisma.account.count();
  admins.forEach((admin) => (admin.password = undefined));

  return { admins, count };
};

const deleteAccount = async (id: number) => {
  await prisma.account.delete({ where: { id }, include: { admin: false } });
};

const updateAccount = async (id: number, account: any): Promise<Account> => {
  const updatedAccount = await prisma.account.update({
    where: { id },
    data: { ...account },
  });
  return updatedAccount;
};

export const accountsService = {
  createAdmin,
  createJobSeeker,
  createEmployer,
  findAccountByEmail,
  findAccountById,
  findAccounts,
  findAndUpdatePasswordByEmail,
  findAdminById,
  findAdmins,
  deleteAccount,
  updateAccount,
};
