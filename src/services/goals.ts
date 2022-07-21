import { Goal, Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

export const getAllGoals = async (userId: string): Promise<Array<Goal>> => {
  
  const data = await prisma.goal.findMany({
    where: {
      userId: userId
    }
  })

  return data
}

export const getOneGoal = async (goalId: string): Promise<Goal> => {
  const data = await prisma.goal.findUniqueOrThrow( {
    where: {
      id: goalId
    }
  })

  return data
}

export const createNewGoal = async (newGoal: Prisma.GoalCreateInput): Promise<Goal> => {
  const data = await prisma.goal.create({
    data: newGoal
  })

  return data
}

export const updateGoal = async (updatedGoal: Prisma.GoalUpdateInput, goalId: string): Promise<Goal> => {
  const data = await prisma.goal.update({
    data: updatedGoal,
    where: {
      id: goalId
    }
  })

  return data
}

export const deleteGoal = async (goalId: string): Promise<Goal> => {
  const data = await prisma.goal.delete({
    where: {
      id: goalId
    }
  })

  return data
}