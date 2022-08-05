import { Board, Prisma } from '@prisma/client'
import prisma from '../lib/prisma'

export const getAllBoards = async (userId: string): Promise<Array<Board>> => {
  const data = await prisma.board.findMany({
    where: {
      userId
    }
  })

  return data
}

export const getOneBoard = async (boardId: string): Promise<Board> => {
  const data = await prisma.board.findUniqueOrThrow({
    where: {
      id: boardId
    }
  })

  return data
}

export const createNewBoard = async (newBoard: Prisma.BoardCreateInput, userId: string): Promise<Board> => {
  const data = await prisma.board.create({
    data: {
      ...newBoard,
      user: {
        connect: { id: userId }
      }
    }
  })

  return data
}

export const updateBoardById = async (updatedBoard: Prisma.BoardUpdateInput, boardId: string): Promise<Board> => {
  const data = await prisma.board.update({
    data: updatedBoard,
    where: {
      id: boardId
    }
  })

  return data
}

export const deleteBoardById = async (boardId: string): Promise<Board> => {
  const data = await prisma.board.delete({
    where: {
      id: boardId
    }
  })

  return data
}

export const haveAuthorizationOnBoard = async (boardId:string, userId: string): Promise<boolean> => {
  const dbUserId = await prisma.board.findUniqueOrThrow({
    where: {
      id: boardId
    },
    select: {
      userId: true
    }
  })
  if (userId !== dbUserId.userId) return false
  return true
}
