import app from "./app";
import prisma from "./lib/prisma";
import { Request, Response } from 'express';

const PORT = process.env.PORT || 3000;

async function main (){
  try {
    await prisma.$connect();
    console.log('Database connection is working');
    app.use('/',(req:Request, res:Response)=>{
    res.json('bebito fiu fiu');
    });
    app.listen(PORT,()=>{
      console.log(`Server is ready on port ${PORT}`); 
    });
  } catch (error) {
    if(error instanceof Error)
    console.error(error.message);
  }
}

main();