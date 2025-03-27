import express from 'express';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';
import { validateRequest } from '../../middleware/validateRequest';
import { authenticate } from '../../middleware/auth';
import { loginRateLimiter } from '../../middleware/rateLimiter';
const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidations.createUserValidationSchema),
  AuthControllers.signup,
);
router.post(
  '/login',
  validateRequest(AuthValidations.loginUserValidationSchema), loginRateLimiter, AuthControllers.login
);
router.post('/refresh-token', AuthControllers.refreshToken());
router.get("/me", authenticate, AuthControllers.getUserDetails);

export const AuthRoutes = router;
