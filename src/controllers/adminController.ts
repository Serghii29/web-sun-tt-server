/* eslint-disable @typescript-eslint/no-explicit-any */
import { Admin, PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const secretKey = 'hi09ifwenkdjnvwsnv';

const registerAdmin = async (admin: Admin): Promise<Admin> => {
  return prisma.admin.create({
    data: admin,
  });
};

const loginAdmin = async (
  name: string,
  password: string,
): Promise<string | null> => {
  const user = await prisma.admin.findFirst({
    where: {
      name,
      password,
    },
  });

  if (user) {
    return generateToken(user);
  }

  return null;
};

const generateToken = (admin: Admin): string => {
  return jwt.sign({ admin }, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token: string): Admin | null => {
  try {
    const updateToken = token.slice(7);
    const decoded = jwt.verify(updateToken, secretKey);
    return (decoded as any).admin;
  } catch (error) {
    return null;
  }
};

export { registerAdmin, loginAdmin, verifyToken };
