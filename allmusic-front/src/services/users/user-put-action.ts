import { UserUpdateDto } from "src/interfaces/user-interface";
import { AuthService } from "../AuthService";


export const userUpdateAction = async (userUpdateDto: UserUpdateDto) => {
  const token = localStorage.getItem("token"); // O el lugar donde guardes el token
  return await AuthService.put("/user", userUpdateDto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};