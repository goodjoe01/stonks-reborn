import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import goalRouter from './routes/goal.route'
import userRouter from './routes/user.route'
import { ErrorHandler } from './middleware/error-handler'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// Routes
app.use(userRouter)
app.use('/api/v1/goals', goalRouter)

app.use(ErrorHandler)

export default app
