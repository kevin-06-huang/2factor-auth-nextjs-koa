import Koa from "koa"
import Router from "koa-router"
import 'dotenv/config'

const PORT = process.env.PORT || 3000

const app = new Koa()
const router = new Router()

app.use(router.routes())

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})