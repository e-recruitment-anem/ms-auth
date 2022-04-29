import { object, string } from "zod";

export const CreateAgencyRequest = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),
    email: string({
      required_error: "email is required",
    }),
    phoneNumber: string({
      required_error: "phoneNumber is required",
    }),
  }),
});

export const getAgencyRequest = object({
  params: object({
    id: string({
      required_error: "id is required",
    }),
  }),
});
export const deleteAgencyRequest = typeof getAgencyRequest;

export const updateAgencyRequest =
  typeof CreateAgencyRequest && getAgencyRequest;

export const getAgenciesRequest = object({
  query: object({
    page: string().optional(),
    itemsPerPage: string().optional(),
    name: string().optional(),
    email: string().optional(),
    phoneNumber: string().optional(),
  }),
});

export const assignAdminTAgencyRequest = object({
  params: object({
    agencyId: string({
      required_error: "agencyId is required",
    }),
    adminId: string({
      required_error: "adminId is required",
    }),
  }),
});
