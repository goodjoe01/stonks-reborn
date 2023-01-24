import { Router } from 'express'
import { deleteDeposit, getDepositsByBoard, getDepositById, postNewDeposit, putDeposit } from '../controllers/deposit.controller'
import { AuthHandler } from '../middleware/auth'
import { HttpError } from '../types/error'

const depositRouter = Router()

depositRouter.post('/', AuthHandler, postNewDeposit)
depositRouter.get('/', AuthHandler, getDepositsByBoard)
depositRouter.get('/:id', AuthHandler, getDepositById)
depositRouter.put('/:id', AuthHandler, putDeposit)
depositRouter.delete('/:id', AuthHandler, deleteDeposit)
depositRouter.all('/', (req, res, next) => {
  throw new HttpError('Method not supported.', 405)
}
)

export default depositRouter
