import Koa from "koa"
import Router from "koa-router"
import 'dotenv/config'

import { PrismaClient } from "@prisma/client"
export const prisma = new PrismaClient()

const PORT = process.env.PORT || 3000

async function main() {
  const app = new Koa()
  const router = new Router()

  app.use(router.routes())

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