import express from 'express';
import { create, all, destroy } from '../controllers/fertilizerController';
import verifyJWT from '../middleware/verifyAuth';

const router = express.Router();

// create  a fertilizr record
router.post('/create', verifyJWT, create);

// list all fertilizer records
router.get('/all', all);

// delete record
router.delete('/delete/:id', verifyJWT, destroy);
export default router;
