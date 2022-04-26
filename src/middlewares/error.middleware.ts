import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    status = 500,
    code = "ErrorException",
    message = "Something went wrong",
  } = error;
  res.status(status).send({
    success: false,
    error: { code, message },
    body: null,
  });
};

export default errorMiddleware;
