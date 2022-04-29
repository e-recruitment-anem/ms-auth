import { Agency, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAgency = async (
  agency: Prisma.AgencyCreateInput
): Promise<Agency> => {
  const { name, email, phoneNumber } = agency;
  return await prisma.agency.create({
    data: { name, email, phoneNumber },
  });
};

const deleteAgency = async (id: number) => {
  await prisma.agency.delete({ where: { id } });
};

const updateAgency = async (
  id: number,
  agency: Prisma.AgencyUpdateInput
): Promise<Agency> => {
  return await prisma.agency.update({ where: { id }, data: { ...agency } });
};

const findAgencyById = async (id: number): Promise<Agency> => {
  return await prisma.agency.findUnique({ where: { id } });
};

const findAgencies = async (
  filter: Prisma.AgencyWhereInput,
  page: number = 1,
  itemsPerPage: number = 50
): Promise<{
  agencies: Agency[];
  count: number;
}> => {
  const agencies = await prisma.agency.findMany({
    where: { ...filter },
    take: itemsPerPage,
    skip: itemsPerPage * (page - 1),
  });
  const count = await prisma.agency.count();
  return { agencies, count };
};

export const agenciesService = {
  createAgency,
  deleteAgency,
  updateAgency,
  findAgencies,
  findAgencyById,
};
