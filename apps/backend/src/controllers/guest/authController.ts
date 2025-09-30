import { Request, Response } from 'express';

import UserService from '../../services/userService';
import type { LoginBody, RegistrationBody } from '../../types/auth';

const authController = (() => {
  const register = async (
    req: Request<object, object, RegistrationBody>,
    res: Response
  ) => {
    try {
      const newUser = await UserService.createNewUser(req.body);

      res.json({
        status: 'success',
        message: 'User created successfully!',
        data: newUser,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.json({
          status: 'error',
          message: err.message,
        });
      } else {
        res.json({
          status: 'error',
          message: 'An unknown error occurred',
        });
      }
    }
  };

  const login = async (
    req: Request<object, object, LoginBody>,
    res: Response
  ) => {
    try {
      const token = await UserService.loginUser(req.body);

      res.json({
        status: 'success',
        message: 'Log in success!',
        data: token,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.json({
          status: 'error',
          message: err.message,
        });
      } else {
        res.json({
          status: 'error',
          message: 'An unknown error occurred',
        });
      }
    }
  };

  const redirect = (req: Request, res: Response) => {};

  return { register, login, redirect };
})();

export default authController;
