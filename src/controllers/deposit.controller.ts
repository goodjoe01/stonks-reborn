import { Prisma } from '@prisma/client'
import { NextFunction, Response } from 'express'
import { AuthRequest } from '../types/express-types'
import {
  createNewDeposit,
  deleteDepositById,
  getAllDeposits,
  getOneDeposit,
  haveAuthorizationOnDeposit,
  updateDepositById
} from '../services/deposit.service'
import { AuthorizationHttpError } from '../types/error'

export const getDepositsByBoard = async (req : AuthRequest, res: Response, next: NextFunction) => {
  const boardId = req.params.id

  const deposits = await getAllDeposits(boardId)

  res.status(200).send(deposits)
}

export const getDepositById = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  const depositId = req.params.boardId
  const deposit = await getOneDeposit(depositId)

  if (userId !== deposit.board.userId) throw new AuthorizationHttpError()

  res.status(200).send(deposit)
}

export const postNewDeposit = async (req: AuthRequest, res: Response) => {
  const newDeposit: Prisma.DepositCreateInput = req.body
  const createdDeposit = await createNewDeposit(newDeposit)

  res.status(201).send(createdDeposit)
}

export const putDeposit = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  const depositId: string = req.params.id

  if (!haveAuthorizationOnDeposit(depositId, userId as string)) throw new AuthorizationHttpError()

  const updateDeposit: Prisma.DepositUpdateInput = req.body
  const updatedDeposit = await updateDepositById(updateDeposit, depositId)

  res.status(200).send(updatedDeposit)
}

export const deleteDeposit = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  const depositId: string = req.params.id

  if (!haveAuthorizationOnDeposit(depositId, userId as string)) throw new AuthorizationHttpError()

  const deletedDeposit = await deleteDepositById(depositId)

  res.status(200).send(deletedDeposit)
}
