import  express  from 'express'
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routes/user'


const app = express();
/*app.use('/',(req:Request, res:Response)=>{
  res.json('hello');
});*/
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(userRouter);

export default app;
