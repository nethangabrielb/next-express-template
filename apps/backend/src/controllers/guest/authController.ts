import { Request, Response } from 'express';

import type { ApiResponse } from '../../types/apiResponse';
import type { RegistrationBody } from '../../types/registrationBody';

const authController = (() => {
  const register = (
    req: Request<object, object, RegistrationBody>,
    res: Response
  ) => {};

  const login = (req: Request, res: Response) => {};

  return { register, login };
})();

export default authController;
