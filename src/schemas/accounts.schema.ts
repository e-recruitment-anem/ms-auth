import { ADMIN_TYPE } from "@prisma/client";
import { nativeEnum, object, string } from "zod";

export const getAdminRequest = object({
  params: object({
    id: string({
      required_error: "id is required",
    }),
  }),
});

export const deleteAdminRequest = typeof getAdminRequest;

export const getAdminsRequest = object({
  query: object({
    page: string().optional(),
    itemsPerPage: string().optional(),
    firstname: string().optional(),
    lastname: string().optional(),
    email: string().optional(),
    phoneNumber: string().optional(),
    birthDate: string().optional(),
    birthDate_gte: string().optional(),
    birthDate_lte: string().optional(),
    agency: string().optional(),
    type: nativeEnum(ADMIN_TYPE).optional(),
  }),
});
