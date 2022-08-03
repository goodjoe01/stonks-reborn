import { Prisma } from '@prisma/client'
import { NextFunction, Response } from 'express'
import { AuthRequest } from '../types/express-types'
import {
  createNewGoal,
  deleteGoalById,
  getAllGoals,
  getOneGoal,
  haveAuthorizationOnGoal,
  updateGoalById
} from '../services/goal.service'
import { AuthorizationHttpError } from '../types/error'

export const getGoals = async (req : AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.userId

  const goals = await getAllGoals(userId as string)

  res.status(200).send(goals)
}

export const getGoal = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  const goalId = req.params.id
  const goal = await getOneGoal(goalId)

  if (userId !== goal.userId) throw new AuthorizationHttpError()

  res.status(200).send(goal)
}

export const postNewGoal = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  const newGoal: Prisma.GoalCreateInput = req.body
  const createdGoal = await createNewGoal(newGoal, userId as string)

  res.status(201).send(createdGoal)
}

export const putGoal = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  const goalId: string = req.params.id

  if (!haveAuthorizationOnGoal(goalId, userId as string)) throw new AuthorizationHttpError()

  const updateGoal: Prisma.GoalUpdateInput = req.body
  const updatedGoal = await updateGoalById(updateGoal, goalId)

  res.status(200).send(updatedGoal)
}

export const deleteGoal = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  const goalId: string = req.params.id

  if (!haveAuthorizationOnGoal(goalId, userId as string)) throw new AuthorizationHttpError()

  const deletedGoal = await deleteGoalById(goalId)

  res.status(200).send(deletedGoal)
}
