import express from "express"
import { AuthRoutes } from "../modules/auth/auth.route";
import { PaymentRoutes } from "../modules/payment/payment.route";

const router = express.Router()


const moduleRouters = [
    {
      path: '/auth',
      routes: AuthRoutes,
    },
    {
      path: '/payments',
      routes: PaymentRoutes,
    },
  ];
  
  moduleRouters.forEach((route) => {
    router.use(route.path, route.routes);
  });

export default router;