import { NextFunction, Response } from 'express'
import { HttpError } from '../types/error'
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { AuthRequest } from '../types/express-types'

const TOKEN_KEY = process.env.TOKEN_KEY

export const AuthHandler = (req: AuthRequest, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization

  console.log(auth)

  if (!auth) throw new HttpError('Authorization not found', 401)

  const token = auth.substring(7)

  console.log(token)

  jwt.verify(token, TOKEN_KEY as string, (err: VerifyErrors | null, decoded) => {
    if (err) throw new HttpError(`${err.name}: ${err.message}`, 401)
    req.userId = (decoded as JwtPayload).userId
    next()
  })
}
