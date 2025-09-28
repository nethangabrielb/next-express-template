import { body } from "express-validator";
import { prisma } from "../../lib/prisma";

export default body("email")
  .exists()
  .withMessage("Email is required.")
  .trim()
  .notEmpty()
  .withMessage("Email can't be empty.")
  .isEmail()
  .withMessage("Input must be an email.")
  .custom(async (value) => {
    const user = await prisma.user.findUnique({
      where: {
        email: value,
      },
    });
    if (!user) return true;
    return value !== user.email;
  })
  .withMessage("Email already in use.");
