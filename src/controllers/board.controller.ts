import { Prisma } from '@prisma/client'
import { NextFunction, Response } from 'express'
import { AuthRequest } from '../types/express-types'
import {
  createNewBoard,
  deleteBoardById,
  getAllBoards,
  getOneBoard,
  haveAuthorizationOnBoard,
  updateBoardById
} from '../services/board.service'
import { AuthorizationHttpError } from '../types/error'

export const getBoards = async (req : AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.userId

  const boards = await getAllBoards(userId as string)

  res.status(200).send(boards)
}

export const getBoard = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  const boardId = req.params.id
  const board = await getOneBoard(boardId)

  if (userId !== board.userId) throw new AuthorizationHttpError()

  res.status(200).send(board)
}

export const postNewBoard = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  const newBoard: Prisma.BoardCreateInput = req.body
  const createdBoard = await createNewBoard(newBoard, userId as string)

  res.status(201).send(createdBoard)
}

export const putBoard = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  const boardId: string = req.params.id

  if (!haveAuthorizationOnBoard(boardId, userId as string)) throw new AuthorizationHttpError()

  const updateBoard: Prisma.BoardUpdateInput = req.body
  const updatedBoard = await updateBoardById(updateBoard, boardId)

  res.status(200).send(updatedBoard)
}

export const deleteBoard = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  const boardId: string = req.params.id

  if (!haveAuthorizationOnBoard(boardId, userId as string)) throw new AuthorizationHttpError()

  const deletedBoard = await deleteBoardById(boardId)

  res.status(200).send(deletedBoard)
}
