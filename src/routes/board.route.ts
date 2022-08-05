import { Router } from 'express'
import { deleteBoard, getBoard, getBoards, postNewBoard, putBoard } from '../controllers/board.controller'
import { AuthHandler } from '../middleware/auth'
import { HttpError } from '../types/error'

const boardRouter = Router()

boardRouter.post('/', AuthHandler, postNewBoard)
boardRouter.get('/', AuthHandler, getBoards)
boardRouter.get('/:id', AuthHandler, getBoard)
boardRouter.put('/:id', AuthHandler, putBoard)
boardRouter.delete('/:id', AuthHandler, deleteBoard)
boardRouter.all('/', (req, res, next) => {
  throw new HttpError('Method not supported.', 405)
}
)

export default boardRouter
