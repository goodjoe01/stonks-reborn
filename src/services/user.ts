import { Prisma, User } from "@prisma/client";
import  bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import  prisma  from "../lib/prisma"

const TOKEN_KEY = process.env.TOKEN_KEY;

const createToken = async (user: Prisma.UserCreateInput) =>{
  const {email, id, firstName} = user;
  
  const token = jwt.sign(
    { user_id:id, email, firstName},
    TOKEN_KEY as string,
    { expiresIn: "1h" }
    );
    return token;
}

export const login = async (email: string, password: string) =>{
  try {
    const user = await prisma.user.findUniqueOrThrow({where: {email: email}});

    if(user && (await bcrypt.compare(password, user.password ))){
      const newToken = await createToken(user);
      user.token = newToken;
      
      const signUp = await prisma.user.update({
        data: {
          token: user.token
        } , 
        where:{
        id: user.id
        },
        select:{
          firstName: true,
          lastName: true,
          email: true,
          token: true,
        }
      });
      return signUp;
    }
    else{
      return console.log('Incorrect credentials');
    }

  } catch (error) {
    if(error instanceof Error){
      return console.log('Error in service' + error.message);
    }
  }
}

export const createUser = async (user: Prisma.UserCreateInput) =>{
  try {

    const jsonWT = await createToken(user);
    const encryptedPassword = await bcrypt.hash(user.password,10);

    const newUser = await prisma.user.create({
        data: {
          dni: user.dni,      
          email: user.email,   
          password: encryptedPassword,
          firstName: user.firstName,    
          lastName: user.lastName,
          token: jsonWT
        }
      });

  return newUser;
  
  } catch (error) {
    console.log(error);
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
        firstName:true,
        lastName: true,
        dni: true,
        email: true,
        active: true,
        token: true
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
        firstName:true,
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
    const encryptedPassword = await bcrypt.hash(user.password,10);
    user.password = encryptedPassword;
    const userUpdated = await prisma.user.update({
      data: user,
      where:{
        id:userId
      },
      select:{
        id: true,
        firstName:true,
        lastName: true,
        dni: true,
        email: true
      }
    });

    return userUpdated;

  } catch (error) {
    if(error instanceof Error){
      return console.log('Error in service' + error.message);
    }
  }
}

