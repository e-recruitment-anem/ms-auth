import { Request, Response, NextFunction } from "express";
import { ADMIN_TYPE } from "@prisma/client";
import { accountsService } from "../services";
import { NotAuthorizedException } from "../exceptions";

const checkAdminRole = (roles: ADMIN_TYPE[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = res.locals.account;
    const account = await accountsService.findAdminById(id);
    if (!roles.includes(account["type"])) next(new NotAuthorizedException());
    next();
  };
};

export default checkAdminRole;
