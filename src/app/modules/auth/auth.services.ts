import bcrypt from "bcrypt";
import config from "../../config";
import { TUser } from "./auth.interface";
import { User } from "./auth.model";

const createUserIntoDB = async (payload: TUser) => {
  const newUser = payload;
  const hashedPassword = await bcrypt.hash(
    newUser.password,
    Number(config.salt)
  );
  newUser.password = hashedPassword;
  const result = await User.create(newUser);
  return result;
};


export const AuthServices = {
  createUserIntoDB,
};
