import  express  from 'express'
import morgan from 'morgan';
import cors from 'cors';
import goalRouter from './routes/goal.route';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes

app.use('/api/v1/goals', goalRouter)

export default app;
