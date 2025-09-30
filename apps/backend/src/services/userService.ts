import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserRepository from '../repositories/userRepository';
import type { LoginBody, RegistrationBody } from '../types/auth';

const LOGIN_ERR_MESSAGE = 'Invalid username or password. Please try again.';

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
  loginUser: async (data: LoginBody) => {
    // check if username exists
    const user = await UserRepository.findByUsername(data.username);
    if (!user) {
      throw new Error(LOGIN_ERR_MESSAGE);
    }

    // validate if password is correct
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error(LOGIN_ERR_MESSAGE);
    }

    // create new token
    const token = jwt.sign(user, process.env.JWT_SECRET!);

    // return token
    return token;
  },
  getUserById: async (id: number) => {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  },

  getAllUsers: async () => {
    return UserRepository.findAll();
  },

  updateUser: async (id: number, data: Partial<RegistrationBody>) => {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return UserRepository.updateById(id, data);
  },

  deleteUser: async (id: number) => {
    return UserRepository.deleteById(id);
  },
};

export default UserService;
