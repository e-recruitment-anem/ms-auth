import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import { accountsService } from "../services";
import jwtHelper from "../helpers/jwt.helper";
import { NotAuthenticatedException } from "../exceptions";

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { Bearer: cookie = "" } = req.cookies;
  if (_.isNull(cookie) || _.isUndefined(cookie) || cookie === "") {
    next(new NotAuthenticatedException());
  } else {
    try {
      const verifiedToken = await jwtHelper.verifyToken(cookie);
      const account = await accountsService.findAccountById(
        verifiedToken["id"]
      );
      if (_.isNull(account) || _.isUndefined(account)) {
        next(new NotAuthenticatedException());
      } else {
        res.locals.account = account;
      }
    } catch (error) {
      return next(new NotAuthenticatedException());
    }
  }
  next();
};

export default isAuth;
