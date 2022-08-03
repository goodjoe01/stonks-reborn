import { NotFoundError } from '@prisma/client/runtime'
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { HttpError, NotFoundHttpError } from '../types/error'

export const ErrorHandler: ErrorRequestHandler = (err: HttpError | unknown, req: Request, res: Response, next: NextFunction) => {
  console.log({ err })

  let customError = err

  if (!(err instanceof HttpError)) {
    customError = new HttpError('Something went wrong! :c')
  }

  if (err instanceof NotFoundError) {
    customError = new NotFoundHttpError()
  }

  res.status((customError as HttpError).status).json(customError)
}
