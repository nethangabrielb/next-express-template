// ← executes immediately
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from 'dotenv';
import { resolve } from 'path';

import { PrismaClient } from '../../generated/client';

config({ path: resolve(process.cwd(), '../.env') });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });
