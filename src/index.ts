import * as dotenv from 'dotenv'
import app from './app'
import prisma from './lib/prisma'
dotenv.config()

const PORT = process.env.PORT || 3000

async function main () {
  try {
    await prisma.$connect()
    console.log('Database connection is working')
    app.listen(PORT, () => {
      console.log(`Server is ready on port ${PORT}`)
    })
  } catch (error) {
    if (error instanceof Error) { console.error(error.message) }
  }
}

main()
