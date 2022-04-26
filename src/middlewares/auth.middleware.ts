import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import { accountsService } from "../services";
import jwtHelper from "../helpers/jwt.helper";
import { NotAuthenticatedException } from "../exceptions";

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { cookie } = req.headers;
  if (_.isNull(cookie) || _.isUndefined(cookie)) {
    next(new NotAuthenticatedException());
  } else {
    const token = cookie.replace("Authorization=", "");
    const verifiedToken = await jwtHelper.verifyToken(token);
    const account = await accountsService.findAccountById(verifiedToken["id"]);
    if (_.isNull(account) || _.isUndefined(account)) {
      next(new NotAuthenticatedException());
    } else {
      res.locals.account = account;
    }
  }
  next();
};

export default isAuth;
