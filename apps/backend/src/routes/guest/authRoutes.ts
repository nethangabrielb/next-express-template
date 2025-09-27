import { Router } from "express";
import authController from "../../controllers/guest/authController";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
