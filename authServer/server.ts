import koa from "koa"
import router from "koa-router"
import 'dotenv/config'

const PORT = process.env.PORT || 3000

const app = new koa()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})