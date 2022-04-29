import { number, object, string, nativeEnum } from "zod";
import { ADMIN_TYPE } from "@prisma/client";

export const CreateAdminRequest = object({
  body: object({
    email: string({
      required_error: "email is required",
    }),
    type: nativeEnum(ADMIN_TYPE),
    agencyId: number({
      required_error: "agecncy is required",
    }),
    firstname: string({
      required_error: "firstname is required",
    }),
    lastname: string({
      required_error: "lastname is required",
    }),
    birthDate: string({
      required_error: "birthDate is required",
    }).optional(),
    phoneNumber: string({
      required_error: "phoneNumber is required",
    }),
  }),
});

export const CreateJobSeekerRequest = object({
  body: object({
    email: string({
      required_error: "email is required",
    }),
    password: string({
      required_error: "password is required",
    }),
    agencyId: number({
      required_error: "agecncy is required",
    }),
    firstname: string({
      required_error: "firstname is required",
    }),
    lastname: string({
      required_error: "lastname is required",
    }),
    birthDate: string({
      required_error: "birthDate is required",
    }).optional(),
    phoneNumber: string({
      required_error: "phoneNumber is required",
    }),
  }),
});

export const CreateEmployerRequest = object({
  body: object({
    email: string({
      required_error: "email is required",
    }),
    password: string({
      required_error: "password is required",
    }),
    agencyId: number({
      required_error: "agecncy is required",
    }),
  }),
});

export const loginRequest = object({
  body: object({
    email: string({
      required_error: "email is required",
    }),
    password: string({
      required_error: "password is required",
    }),
  }),
});

export const forgetPasswordRequest = object({
  params: object({
    email: string({
      required_error: "email is required",
    }),
  }),
});

export const resetPasswordRequest = object({
  params: object({
    token: string({
      required_error: "email is required",
    }),
  }),
  body: object({
    password: string({
      required_error: "password is required",
    }),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),
  }),
});

export const verifyAccount = object({
  params: object({
    token: string({
      required_error: "token is required",
    }),
  }),
});
