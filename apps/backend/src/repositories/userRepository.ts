import { prisma } from '../prisma/client';
import type { RegistrationBody } from '../types/registrationBody';

const UserRepository = {
  createNewUser: (data: RegistrationBody) => prisma.user.create({ data }),
  findById: (id: number) => prisma.user.findUnique({ where: { id } }),
};

export default UserRepository;
