import Koa from "koa"

const RegisterUser = async (ctx: Koa.Context) => {
  //console.log(ctx)
  console.log(ctx.request.body)
}

const LoginUser = async (ctx: Koa.Context) => {
  console.log(ctx)
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
