import { UserUpdateDto } from "src/interfaces/user-interface";
import { AuthService } from "../AuthService";


export const userUpdateAction = async (userUpdateDto: UserUpdateDto) => {
  const{data} = await AuthService.put("/user", userUpdateDto);
  return data;
}