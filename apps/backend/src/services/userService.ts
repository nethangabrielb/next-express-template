import bcrypt from 'bcryptjs';

import UserRepository from '../repositories/userRepository';
import type { RegistrationBody } from '../types/registrationBody';

const UserService = {
  createNewUser: async (data: RegistrationBody) => {
    const encryptedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await UserRepository.createNewUser({
      ...data,
      password: encryptedPassword,
    });

    if (!newUser) {
      throw new Error('There was an unexpected error creating the account.');
    }
    return newUser;
  },
};

export default UserService;
