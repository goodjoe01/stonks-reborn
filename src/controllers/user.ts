import { Prisma } from '@prisma/client';
import { createUser, getAllUsers, getOneUser, updateUser} from '../services/user'
import { Request, Response } from 'express';

export const postUser = async (req: Request, res: Response)=>{
  try {
    const userBody: Prisma.UserCreateInput = req.body
    const user = await createUser(userBody);
    return res.status(200).json(user);
    
  } catch (error) {
    if(error instanceof Error){
      return res.status(500).json({error: error.message});
    }
  }
}

export const getUsers = async (req: Request, res: Response) =>{
  try {
    const users = await getAllUsers();
    res.status(200).json(users);

  } catch (error) {
    if(error instanceof Error){
      res.status(500).json({error: error.message});
    }
  }
}

/*export const getUsers = (req: Request, res: Response) =>{
    getAllUsers()
    .then(user=>{
      throw new Error('Hola bola');
      res.status(200).json(user);})
    .catch(err=>{res.status(500).json({message: err})});
}*/

export const getUser = async (req: Request, res: Response) =>{
  try {
    const id = req.params.id;
    const user = await getOneUser(id);
    res.status(200).json(user);

  } catch (error) {
    if(error instanceof Error){
      res.status(500).json({error: error.message});
    }
  }
}

export const putUser = async (req: Request, res: Response) =>{
  try {
    const id = req.params.id;
    const userBody: Prisma.UserCreateInput = req.body
    const user = await updateUser(id,userBody);
    res.status(200).json(user);

  } catch (error) {
    if(error instanceof Error){
      res.status(500).json({error: error.message});
    }
  }
}