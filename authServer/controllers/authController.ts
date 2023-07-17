import Koa from "koa"
import { prisma } from "../server";

const RegisterUser = async (ctx: Koa.Context) => {
  try {
    const { email, password } = ctx.request.body as any
    const res = await prisma.user.create({
      data: {
        email,
        password
      }
    })
    ctx.status = 200
    ctx.body = 'accepted'
  } catch (err) {
    ctx.status = 409
    ctx.body = 'rejected'
  }
}

const LoginUser = async (ctx: Koa.Context) => {
  try {

  } catch (err) {
    
  }
}

const GenerateOTP = async (ctx: Koa.Context) => {
  console.log(ctx)
}

const VerifyOTP = async (ctx: Koa.Context) => {
  console.log(ctx)
}

const ValidateOTP = async (ctx: Koa.Context) => {
  console.log(ctx)
}

const DisableOTP = async (ctx: Koa.Context) => {
  console.log(ctx)
}

const authController = {
  RegisterUser,
  LoginUser,
  GenerateOTP,
  VerifyOTP,
  ValidateOTP,
  DisableOTP,
}

export default authController
