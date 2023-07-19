import Koa from "koa";
import { prisma } from "../server";
import crypto from "crypto";
import { encode } from "hi-base32";
import OTPAuth from "otpauth";
import { KoaRequestBody } from "@/types";

const RegisterUser = async (ctx: Koa.Context) => {
  try {
    const { username, password } = ctx.request.body as KoaRequestBody;
    await prisma.user.create({
      data: {
        username,
        password: crypto.createHash("sha256").update(password as string).digest("hex"),
      },
    });
    ctx.status = 200;
    ctx.body = "accepted";
  } catch (err) {
    ctx.status = 409;
    ctx.body = { status: "rejected" };
  }
};

const LoginUser = async (ctx: Koa.Context) => {
  try {
    const { username, password } = ctx.request.body as KoaRequestBody;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      ctx.status = 404;
      ctx.body = { status: "fail to find user" };
    } else if (crypto.createHash("sha256").update(password as string).digest("hex") !== user!.password) {
      ctx.status = 401;
      ctx.body = { status: "password incorrect" };
    } else {
      ctx.status = 200;
      ctx.body = {
        username: user!.username,
        otp_enabled: user!.otp_enabled,
      };
    }
  } catch (err) {
    ctx.status = 409;
    ctx.body = { status: "rejected" };
  }
};

const generateRandomBase32 = () => {
  const buffer = crypto.randomBytes(15);
  const base32 = encode(buffer).replace(/=/g, "").substring(0, 24);
  return base32;
};

const GenerateOTP = async (ctx: Koa.Context) => {
  try {
    const { username } = ctx.request.body as KoaRequestBody;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      ctx.status = 404;
      ctx.body = { status: "fail to find user" };
    } else {
      const base32Secret = generateRandomBase32();

      const totp = new OTPAuth.TOTP({
        issuer: "Kevin Huang",
        label: "2FA Example",
        algorithm: "SHA1",
        digits: 6,
        period: 15,
        secret: base32Secret,
      });

      const otpAuthUrl = totp.toString();

      await prisma.user.update({
        where: { username },
        data: {
          otp_auth_url: otpAuthUrl,
          otp_base32: base32Secret,
        },
      });

      ctx.status = 200;
      ctx.body = {
        base32Secret,
        otpAuthUrl,
      };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { status: "error" };
  }
};

const VerifyOTP = async (ctx: Koa.Context) => {
  try {
    const { token, username } = ctx.request.body as KoaRequestBody;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      ctx.status = 404;
      ctx.body = { status: "fail to find user" };
    } else {
      const totp = new OTPAuth.TOTP({
        issuer: "Kevin Huang",
        label: "2FA Example",
        algorithm: "SHA1",
        digits: 6,
        period: 15,
        secret: user.otp_base32!,
      });

      let delta = null;
      if(token)
        delta = totp.validate({ token });
      if (delta === null) {
        ctx.status = 401;
        ctx.body = { status: "token invalid" };
      } else {
        const updatedUser = await prisma.user.update({
          where: { username },
          data: {
            otp_enabled: true,
          },
        });

        ctx.status = 200;
        ctx.body = {
          username,
          otp_enabled: updatedUser.otp_enabled,
        };
      }
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { status: "error" };
  }
};

const ValidateOTP = async (ctx: Koa.Context) => {
  try {
    const { token, username } = ctx.request.body as KoaRequestBody;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      ctx.status = 404;
      ctx.body = { status: "fail to find user" };
    } else {
      const totp = new OTPAuth.TOTP({
        issuer: "Kevin Huang",
        label: "2FA Example",
        algorithm: "SHA1",
        digits: 6,
        period: 15,
        secret: user.otp_base32!,
      });

      let delta = null;
      if(token)
        delta = totp.validate({ token });
      if (delta === null) {
        ctx.status = 401;
        ctx.body = { status: "token invalid" };
      } else {
        ctx.status = 200;
        ctx.body = {};
      }
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { status: "error" };
  }
};

const DisableOTP = async (ctx: Koa.Context) => {
  try {
    const { username } = ctx.request.body as KoaRequestBody;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      ctx.status = 404;
      ctx.body = { status: "fail to find user" };
    } else {
      const updatedUser = await prisma.user.update({
        where: { username },
        data: {
          otp_enabled: false,
        },
      });

      ctx.status = 200;
      ctx.body = {
        username,
        otp_enabled: updatedUser.otp_enabled,
      };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { status: "error" };
  }
};

const authController = {
  RegisterUser,
  LoginUser,
  GenerateOTP,
  VerifyOTP,
  ValidateOTP,
  DisableOTP,
};

export default authController;
