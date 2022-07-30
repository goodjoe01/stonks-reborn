import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HttpError } from "../types/error";



export const ErrorHandler: ErrorRequestHandler  = ( err: HttpError | unknown, req: Request, res: Response, next: NextFunction) => {

  let customError = err;

  if (!(err instanceof HttpError)) {
    customError = new HttpError('Something went wrong! :c');
  }

  res.status((customError as HttpError).status).json(customError)

}