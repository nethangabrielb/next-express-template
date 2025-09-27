import { Request, Response } from "express";

const authController = (() => {
  const register = (req: Request, res: Response) => {};

  const login = (req: Request, res: Response) => {};

  return { register, login };
})();

export default authController;
