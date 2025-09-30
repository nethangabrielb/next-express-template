import { prisma } from '../prisma/client';
import type { RegistrationBody } from '../types/auth';

const UserRepository = {
  createNewUser: (data: RegistrationBody) => prisma.user.create({ data }),
  findById: (id: number) => prisma.user.findUnique({ where: { id } }),
};

export default UserRepository;
