import { TPayment } from "./payment.interface";
import { Payment } from "./payment.model";

const addTransactionIntoDb = async (payload: TPayment) => {
  const result = await Payment.create(payload);
  return result;
};

export const PaymentServices = {
  addTransactionIntoDb,
};
