// const createAccount = async () => {};

import HttpException from "../exceptions/http.exception";

// const editPassword = async () => {};
const login = async () => {
  throw new HttpException(400, "aa", "bb");
};
// const registerAdmin = async () => {};
// const registerJobSeeker = async () => {};
// const registerEmployer = async () => {};
// const forgetPassword = async () => {};
// const resetPassword = async () => {};

export const accountsService = {
  login,
  // registerAdmin,
  // registerJobSeeker,
  // registerEmployer,
  // forgetPassword,
  // resetPassword,
};
