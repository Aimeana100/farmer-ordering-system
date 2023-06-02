import express from 'express';
import { create, all, destroy } from '../controllers/seedController';
import verifyJWT from '../middleware/verifyAuth';

const router = express.Router();

// record eate a seed
router.post('/create', verifyJWT, create);

// all seed record
router.get('/all', all);

// all delete record
router.delete('/delete/:id', verifyJWT, destroy);

export default router;
