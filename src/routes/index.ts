import { Router } from 'express';
import authRoutes from './auth';
import fertilizerRoutes from './fertilizer';
import seedRoutes from './seed';
import orderRoutes from './order';

const router = Router();

router.use('/auth', authRoutes);
router.use('/seeds', seedRoutes);
router.use('/order', orderRoutes);
router.use('/fertilizer', fertilizerRoutes);
export default router;
