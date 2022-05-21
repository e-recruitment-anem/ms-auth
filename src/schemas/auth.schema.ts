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
    birthPlace: string({
      required_error: "birthPlace is required",
    }).optional(),
    gender: string({
      required_error: "gender is required",
    }).optional(),
    address: string({
      required_error: "address is required",
    }).optional(),
    postalCode: string({
      required_error: "postalCode is required",
    }).optional(),
    residenceCity: number({
      required_error: "residenceCity is required",
    }).optional(),
    nationality: string({
      required_error: "nationality is required",
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
