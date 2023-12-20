import { authHeaders } from "@/store/localStorage";
import { getFetch } from "./utils";
type userLoginData = {
  email: string;
  password: string;
};
interface userRegisterData extends userLoginData {
  username: string;
}
export type userType = {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
};
export type responseErrors = {
  username?: string;
  password?: string;
  email?: string;
};
type userResponse = {
  user?: userType;
  errors?: responseErrors;
};

export const userRegister = async (userdata: userRegisterData) => {
  return (await getFetch({
    path: "/users",
    method: "POST",
    body: {
      user: userdata,
    },
  })) as Promise<userResponse>;
};

export const userLoginFetch = async (userdata: userLoginData) => {
  return (await getFetch({
    path: "/users/login",
    method: "POST",
    body: {
      user: userdata,
    },
  })) as Promise<userResponse>;
};
export const getCurrentUserFetch = () =>
  getFetch({
    path: "/user",
    method: "GET",
    ...authHeaders(),
  }) as Promise<userResponse>;
export const updateUserFetch = (data: Partial<userType>) =>
  getFetch({
    path: "/user",
    method: "PUT",
    ...authHeaders(),
    body: { user: data },
  }) as Promise<
    { user: Exclude<userType, "token"> } | { errors: { message: string } }
  >;
