import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import type { RegistrationBody } from "../../types/registrationBody";
import type { ApiResponse } from "../../types/apiResponse";

import email from "../rules/email";
import password from "../rules/password";
import confirmPassword from "../rules/confirmPassword";

const registrationValidation = [email, password, confirmPassword];

const validateRegistration = [
  ...registrationValidation,
  (
    req: Request<object, object, RegistrationBody>,
    res: Response,
    next: NextFunction
  ) => {
    // Retrieve errors from express-validator on input fields
    const errors = validationResult(req);

    console.log(errors);
    console.log(req.body);

    // Return errors if there are any
    if (!errors.isEmpty()) {
      const errorsArr = errors.array({ onlyFirstError: true });
      return res.json({
        status: "success",
        data: errorsArr.map((err) => err.msg),
        message: "Error validating form input",
      } as ApiResponse<string[]>);
    } else {
      next();
    }
  },
];

export { validateRegistration };
