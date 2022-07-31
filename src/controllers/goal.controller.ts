import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import {
  createNewGoal,
  deleteGoalById,
  getAllGoals,
  getOneGoal,
  updateGoalById
} from '../services/goal.service'

export const getGoals = async (req : Request, res: Response, next: NextFunction) => {
  const userId = ''
  const goals = await getAllGoals(userId)

  res.status(200).send(goals)
}

export const getGoal = async (req: Request, res: Response) => {
  const goalId = req.params.id
  const goal = await getOneGoal(goalId)

  res.status(200).send(goal)
}

export const postNewGoal = async (req: Request, res: Response) => {
  const userId = 'example'
  const newGoal: Prisma.GoalCreateInput = req.body
  const createdGoal = await createNewGoal(newGoal, userId)

  res.status(201).send(createdGoal)
}

export const putGoal = async (req: Request, res: Response) => {
  const goalId: string = req.params.id
  const updateGoal: Prisma.GoalUpdateInput = req.body
  const updatedGoal = await updateGoalById(updateGoal, goalId)

  res.status(200).send(updatedGoal)
}

export const deleteGoal = async (req: Request, res: Response) => {
  const goalId: string = req.params.id
  const deletedGoal = await deleteGoalById(goalId)

  res.status(200).send(deletedGoal)
}
