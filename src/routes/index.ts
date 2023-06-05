import { Router, Request, Response } from 'express';
import authRoutes from './auth';
import fertilizerRoutes from './fertilizer';
import seedRoutes from './seed';
import orderRoutes from './order';

const router: Router = Router();

router.use('/auth', authRoutes);
router.use('/seeds', seedRoutes);
router.use('/order', orderRoutes);
router.use('/fertilizer', fertilizerRoutes);
router.use('*', (req: Request, res: Response) => {
  return res.status(200).json({ status: 'success', message: 'This is default routes' });
});
export default router;
