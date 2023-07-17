import Koa from "koa"
import { prisma } from "../server";

const RegisterUser = async (ctx: Koa.Context) => {
  try {
    const { email, password } = ctx.request.body as any
    await prisma.user.create({
      data: {
        email,
        password
      }
    })
    ctx.status = 200
    ctx.body = 'accepted'
  } catch (err) {
    ctx.status = 409
    ctx.body = { status: 'rejected' }
  }
}

const LoginUser = async (ctx: Koa.Context) => {
  try {
    const { email, password } = ctx.request.body as any
    const user = await prisma.user.findUnique({where: { email }})
    
    if(!user) {
      ctx.status = 404
      ctx.body = { status: 'fail to find user' }
    }
    else if(password !== user!.password) {
      ctx.status = 401
      ctx.body = { status: 'password incorrect' }
    }
    else {
      ctx.status = 200
      ctx.body = {
        email: user!.email,
        otp_enabled: user!.otp_enabled
      }
    }
  } catch (err) {
    ctx.status = 409
    ctx.body = 'rejected'
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
