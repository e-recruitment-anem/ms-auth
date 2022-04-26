import { hashSync, genSaltSync } from "bcrypt";

const hashPassword = (password: string): string => {
  try {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
  } catch (e) {}
};

export default {
  hashPassword,
};
