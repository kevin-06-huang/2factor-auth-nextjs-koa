import Koa from "koa"
import { prisma } from "../server";
import crypto from "crypto";
import { encode } from "hi-base32";
import OTPAuth from "otpauth";

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

const generateRandomBase32 = () => {
  const buffer = crypto.randomBytes(15);
  const base32 = encode(buffer).replace(/=/g, "").substring(0, 24);
  return base32;
};

const GenerateOTP = async (ctx: Koa.Context) => {
  try {
    const { email } = ctx.request.body as any
    const user = await prisma.user.findUnique({ where: { email } });

    if(!user) {
      ctx.status = 404
      ctx.body = { status: 'fail to find user' }
    } else {
      const base32Secret = generateRandomBase32()
      
      const totp = new OTPAuth.TOTP({
        issuer: "Kevin Huang",
        label: "2FA Example",
        algorithm: "SHA1",
        digits: 6,
        period: 15,
        secret: base32Secret,
      });

      const otpAuthUrl = totp.toString()

      await prisma.user.update({
        where: { email },
        data: {
          otp_auth_url: otpAuthUrl,
          otp_base32: base32Secret,
        },
      })
      
      ctx.status = 200
      ctx.body = {
        base32Secret,
        otpAuthUrl
      }
    }
  } catch (err) {
    ctx.status = 500
    ctx.body = 'error'
  }
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
