import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { PaymentValidations } from './payment.validation';
import { PaymentControllers } from './payment.controller';
import { authenticate } from '../../middleware/auth';
import { checkRole } from '../../middleware/checkRole';
const router = express.Router();

router.post(
  '/checkout',
  validateRequest(PaymentValidations.checkoutValidationSchema),
  authenticate, checkRole("user"),
  PaymentControllers.checkout,
);

export const PaymentRoutes = router;
