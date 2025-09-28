import { Router } from "express";
import { validateRegistration } from "../../validators/user/register";

import authController from "../../controllers/guest/authController";

const authRouter = Router();

authRouter.post("/register", validateRegistration, authController.register);
authRouter.post("/login", authController.login);

export default authRouter;
