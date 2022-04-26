import jwt from "jsonwebtoken";

// const default_expire_time = "31d";
const secret = process.env.JWT_SECRET || "jwt-secret";

interface TokenData {
  token: string;
  // expiresIn: number | string;
}

const createToken = async (dataStoredInToken: object): Promise<TokenData> => {
  try {
    return {
      // expiresIn: default_expire_time,
      token: jwt.sign(dataStoredInToken, secret),
    };
  } catch (e) {}
};

export default {
  createToken,
};
