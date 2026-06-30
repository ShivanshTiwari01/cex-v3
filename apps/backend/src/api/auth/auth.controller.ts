import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { user } from './auth.validation';

import { prisma } from '@repo/db';

export const register = async (req: Request, res: Response) => {
  const data = user.parse(req.body);

  if (!data) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input data',
    });
  }

  const { username, password } = data;

  try {
    const userExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Username already taken',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'user created successfully',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const data = user.parse(req.body);

  if (!data) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input data',
    });
  }

  const { username, password } = req.body;

  try {
    const userExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const passwordMatch = bcrypt.compare(password, userExists.password!);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User logged in succesfully',
      data: userExists,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: 'Internal server error',
    });
  }
};
