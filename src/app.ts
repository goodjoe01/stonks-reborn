import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import goalRouter from './routes/goal.route'
import userRouter from './routes/user.route'
import { ErrorHandler } from './middleware/error-handler'
import boardRouter from './routes/board.route'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// Routes
app.use(userRouter)
app.use('/api/v1/goal', goalRouter)
app.use('/api/v1/board', boardRouter)

app.use(ErrorHandler)

export default app
