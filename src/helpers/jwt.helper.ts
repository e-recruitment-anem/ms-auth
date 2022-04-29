import jwt, { JwtPayload } from "jsonwebtoken";

// const default_expire_time = "31d";
const secret = process.env.JWT_SECRET || "jwt-secret";
const expiresIn = process.env.TOKEN_EXPIRE_IN || "60d";

interface TokenData {
  token: string;
  expiresIn: number | string;
}

const createToken = async (dataStoredInToken: object): Promise<TokenData> => {
  try {
    console.log(dataStoredInToken);

    return {
      expiresIn,
      token: jwt.sign({ data: dataStoredInToken }, secret, { expiresIn }),
    };
  } catch (e) {
    console.log(e);
  }
};

const verifyToken = async (token: string): Promise<string | JwtPayload> => {
  let verifiedToken = jwt.verify(token, secret);
  console.log(verifiedToken);
  return verifiedToken;
};

export default {
  createToken,
  verifyToken,
};
