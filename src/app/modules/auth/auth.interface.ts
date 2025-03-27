
export interface TUser {
  username: string;
  password: string;
  role: "admin" | "user"
}

export type TUserLoginDetails = {
  username: string;
  password: string;
};

