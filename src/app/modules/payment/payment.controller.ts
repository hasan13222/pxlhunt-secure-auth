import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PaymentServices } from "./payment.services";
import { Request, Response } from "express";
import stripe from 'stripe'
import config from "../../config";
import { TPayment } from "./payment.interface";

const stripeinstance = new stripe(config.stripe_secret as string);

const checkout = catchAsync(async (req: Request, res: Response) => {
  const { amount, description, house, postal_code, city, state, country, name } = req.body as TPayment;
  const paymentIntent = await stripeinstance.paymentIntents.create({
    amount,
    currency: 'usd',
    payment_method_types: ['card'],
    description,
    shipping: {
      name,
      address: {
        line1: house,
        postal_code,
        city,
        state,
        country,
      },
    },
  });

  const result = await PaymentServices.addTransactionIntoDb(req.body);

  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: "Payment done successfully",
    data: {
      clientSecret: paymentIntent.client_secret,
      paymentData: result
    },
  });
});


export const PaymentControllers = {
  checkout
};
