import { body } from 'express-validator';

import { prisma } from '../../lib/prisma';

export default body('username')
  .exists()
  .withMessage('Username is required.')
  .trim()
  .notEmpty()
  .withMessage("Username can't be empty.")
  .custom(async value => {
    const user = await prisma.user.findFirst({
      where: {
        username: value,
      },
    });
    if (!user) return true;
    return value !== user.username;
  })
  .withMessage('Username already exists.');
