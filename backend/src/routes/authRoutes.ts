import express from 'express'
import { auth, register } from '../controllers/authController';

const router = express.Router();

router.post('/', auth)
router.post('/register', register)

export default router
