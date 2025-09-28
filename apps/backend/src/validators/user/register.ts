import { NextFunction, Request, Response } from 'express';

import { validationResult } from 'express-validator';

import type { ApiResponse } from '../../types/apiResponse';
import type { RegistrationBody } from '../../types/registrationBody';
import confirmPassword from '../rules/confirmPassword';
import email from '../rules/email';
import password from '../rules/password';

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

    // Return errors if there are any
    if (!errors.isEmpty()) {
      const errorsArr = errors.array({ onlyFirstError: true });
      return res.json({
        status: 'success',
        data: errorsArr.map(err => err.msg),
        message: 'Error validating form input',
      } as ApiResponse<string[]>);
    } else {
      next();
    }
  },
];

export { validateRegistration };
