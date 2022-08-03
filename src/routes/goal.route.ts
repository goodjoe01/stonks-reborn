import { Router } from 'express'
import { deleteGoal, getGoal, getGoals, postNewGoal, putGoal } from '../controllers/goal.controller'
import { AuthHandler } from '../middleware/auth'
import { HttpError } from '../types/error'

const goalRouter = Router()

goalRouter.post('/', AuthHandler, postNewGoal)
goalRouter.get('/', AuthHandler, getGoals)
goalRouter.get('/:id', AuthHandler, getGoal)
goalRouter.put('/:id', AuthHandler, putGoal)
goalRouter.delete('/:id', AuthHandler, deleteGoal)
goalRouter.all('/', (req, res, next) => {
  throw new HttpError('Method not supported.', 405)
}
)

export default goalRouter
