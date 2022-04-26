import { hashSync, genSaltSync, compareSync } from "bcrypt";

const hashPassword = (password: string): string => {
  try {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
  } catch (e) {}
};

const comparePassword = (password: string, hashedPassword: string): boolean => {
  return compareSync(password, hashedPassword);
};

export default {
  hashPassword,
  comparePassword,
};
