import jwt, { JwtPayload } from "jsonwebtoken";

// const default_expire_time = "31d";
const secret = process.env.JWT_SECRET || "jwt-secret";
const expiresIn = process.env.TOKEN_EXPIRE_IN || 60 * 60 * 24 * 30;

interface TokenData {
  token: string;
  expiresIn: number | string;
}

const createToken = async (dataStoredInToken: object): Promise<TokenData> => {
  try {
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  } catch (e) {}
};

const verifyToken = async (token: string): Promise<string | JwtPayload> => {
  const verifiedToken = jwt.verify(token, secret);
  return verifiedToken;
};

export default {
  createToken,
  verifyToken,
};
