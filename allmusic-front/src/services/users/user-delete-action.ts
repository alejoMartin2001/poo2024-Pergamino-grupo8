import { AuthService } from "../AuthService";

export const userDeleteAction = async () => {
  const{data} = await AuthService.delete("/user");
  return data;
}