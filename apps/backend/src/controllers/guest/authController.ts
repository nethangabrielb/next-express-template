import { Request, Response } from 'express';

import UserService from '../../services/userService';
import type { RegistrationBody } from '../../types/registrationBody';

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

  const login = (req: Request, res: Response) => {};

  return { register, login };
})();

export default authController;
