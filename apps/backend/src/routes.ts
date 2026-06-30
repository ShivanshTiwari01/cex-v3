import express from 'express';
import authRouter from './api/auth/auth.routes';

const router = express.Router();

router.use('/auth', authRouter);

export default router;
