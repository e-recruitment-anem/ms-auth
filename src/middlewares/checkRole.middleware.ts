import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import { NotAuthorizedException } from "../exceptions";

const checkRole = (roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { role } = res.locals.account;
    if (!roles.includes(role)) next(new NotAuthorizedException());
    next();
  };
};

export default checkRole;
