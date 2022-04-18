import { object, string } from "zod";

export const testSchema = object({
  body: object({
    email: string({
      required_error: "email is required",
    }),
    password: string({
      required_error: "pwd is required",
    }),
    passwordConfirmation: string({
      required_error: "pwd conf is required",
    }),
  }),
});
