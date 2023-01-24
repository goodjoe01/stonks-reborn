import { Deposit, Prisma } from '@prisma/client'
import prisma from '../lib/prisma'
import { DepositWithBoard } from '../types/deposit.prisma'

export const getAllDeposits = async (boardId: string): Promise<Array<Deposit>> => {
  const data = await prisma.deposit.findMany({
    where: {
      boardId
    }
  })

  return data
}

export const getOneDeposit = async (depositId: string): Promise<DepositWithBoard> => {
  const data = await prisma.deposit.findUniqueOrThrow({
    where: {
      id: depositId
    },
    include: {
      board: true
    }
  })

  return data
}

export const createNewDeposit = async (newDeposit: Prisma.DepositCreateInput): Promise<Deposit> => {
  const data = await prisma.deposit.create({
    data: {
      ...newDeposit,
      board: {
        connect: { id: newDeposit.board.connect?.id }
      },
      bank: {
        connect: { id: newDeposit.bank.connect?.id }
      }
    }
  })

  return data
}

export const updateDepositById = async (updatedDeposit: Prisma.DepositUpdateInput, depositId: string): Promise<Deposit> => {
  const data = await prisma.deposit.update({
    data: updatedDeposit,
    where: {
      id: depositId
    }
  })

  return data
}

export const deleteDepositById = async (depositId: string): Promise<Deposit> => {
  const data = await prisma.deposit.delete({
    where: {
      id: depositId
    }
  })

  return data
}

export const haveAuthorizationOnDeposit = async (depositId:string, userId: string): Promise<boolean> => {
  const dbDeposit = await prisma.deposit.findUniqueOrThrow({
    where: {
      id: depositId
    },
    select: {
      board: {
        select: {
          userId: true
        }
      }
    }
  })
  if (userId !== dbDeposit.board.userId) return false
  return true
}
