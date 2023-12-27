import express from 'express';
import { signupController } from '../controllers/v1/authControllers/signupController';
import { signInController } from '../controllers/v1/authControllers/signinController';

const router = express.Router();

router.post('/signup', signupController);
router.post('/signin', signInController);

export default router;
