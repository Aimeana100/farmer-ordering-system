import { Router } from 'express';
import authRoutes from './auth';
import fertilizerRoutes from './fertilizer';
import seedRoutes from './seed';

const router = Router();

router.use('/auth', authRoutes);
router.use('/seed', seedRoutes);
router.use('/fertilizer', fertilizerRoutes);
export default router;
