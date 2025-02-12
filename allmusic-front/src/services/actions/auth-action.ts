import { tokenAuth } from "src/interfaces/auth-interface";
import { AuthService } from "../AuthService";

export const authLoginAction = async (username: string, password: string): Promise<tokenAuth> => {
  const { data } = await AuthService.post<tokenAuth>("/login", {
    username, password
  });

  return data;
}
