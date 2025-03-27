import { z } from 'zod';

const checkoutValidationSchema = z.object({
  body: z.object({
    amount: z.number(),
    description: z.string(),
    house: z.string(),
    name: z.string(),
    postal_code: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
  }),
});



export const PaymentValidations = {
  checkoutValidationSchema
};
