import { Prisma, User } from "@prisma/client";
import  prisma  from "../lib/prisma"

export const createUser = async (user: Prisma.UserCreateInput) =>{
  try {
    const newUser = await prisma.user.create({
      data: {
        dni: user.dni,      
        email: user.email,   
        password: user.password,
        fistName: user.fistName,    
        lastName: user.lastName
      }
  });

  return newUser;
  
  } catch (error) {
    if(error instanceof Error){
      return console.log('Error in service' + error.message);
    }
  }
}

export const getAllUsers = async () =>{
  try {
    const users = await prisma.user.findMany({
      select:{
        id: true,
        fistName:true,
        lastName: true,
        dni: true,
        email: true,
      }
    });
    return users;
  } catch (error) {
    if(error instanceof Error){
      return console.log('Error in service' + error.message);
    }
  }
}

export const getOneUser = async (userId: string) =>{
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where:{
        id:userId
      },
      select:{
        id: true,
        fistName:true,
        lastName: true,
        dni: true,
        email: true,
      }
    });
    return user;
  } catch (error) {
    if(error instanceof Error){
      return console.log('Error in service' + error.message);
    }
  }
}

export const updateUser = async (userId: string, user: Prisma.UserCreateInput) =>{
  try {
    const userUpdated = await prisma.user.update({
      data: user,
      where:{
        id:userId
      },
      select:{
        id: true,
        fistName:true,
        lastName: true,
        dni: true,
        email: true,
      }
    });

    return userUpdated;

  } catch (error) {
    if(error instanceof Error){
      return console.log('Error in service' + error.message);
    }
  }
}