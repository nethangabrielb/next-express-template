import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';

import { prisma } from '../../lib/prisma';
import type { RegistrationBody } from '../../types/registrationBody';

const authController = (() => {
  const register = async (
    req: Request<object, object, RegistrationBody>,
    res: Response
  ) => {
    try {
      const { name, username, email, password } = req.body;

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name,
          username,
          email,
          password: encryptedPassword,
        },
      });

      res.json({
        status: 'success',
        message: 'User created successfully!',
        data: newUser,
      });
    } catch (err) {
      res.json({
        status: 'error',
        message: 'An error occured in the server. Please try again.',
        data: err,
      });
    }
  };

  const login = (req: Request, res: Response) => {};

  return { register, login };
})();

export default authController;
