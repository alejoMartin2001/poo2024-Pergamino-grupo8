import { Login, tokenAuth } from "src/interfaces/auth-interface";
import { AuthService } from "../AuthService";

export const authLoginAction = async (login: Login): Promise<tokenAuth> => {
  const { data } = await AuthService.post<tokenAuth>("/login", login);

  return data;
}
