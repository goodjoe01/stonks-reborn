import { Router } from 'express'
import { deleteGoal, getGoal, getGoals, postNewGoal, putGoal } from '../controllers/goal.controller'

const goalRouter = Router()

goalRouter.post('/', postNewGoal)
goalRouter.get('/', getGoals)
goalRouter.get('/:id', getGoal)
goalRouter.put('/:id', putGoal)
goalRouter.delete('/:id', deleteGoal)

export default goalRouter
