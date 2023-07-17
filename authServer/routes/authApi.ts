import Router from "koa-router"
import authController from "../controllers/authController";

const router = new Router()

router.post("/register", authController.RegisterUser);
router.post("/login", authController.LoginUser);
router.post("/otp/generate", authController.GenerateOTP);
router.post("/otp/verify", authController.VerifyOTP);
router.post("/otp/validate", authController.ValidateOTP);
router.post("/otp/disable", authController.DisableOTP);

export default router;
