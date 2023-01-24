import { Prisma } from '@prisma/client'

export type DepositWithBoard = Prisma.DepositGetPayload<{include: { board: true }}>
