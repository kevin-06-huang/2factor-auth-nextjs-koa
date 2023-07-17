import Koa from "koa"
import 'dotenv/config'

import { PrismaClient } from "@prisma/client"
export const prisma = new PrismaClient()

import authRouter from "./routes/authApi";

const PORT = process.env.PORT || 3000

async function main() {
  const app = new Koa()

  app.use(authRouter.routes())

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });