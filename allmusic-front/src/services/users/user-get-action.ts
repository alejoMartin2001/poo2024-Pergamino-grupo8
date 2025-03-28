import { UserResponseDto } from "src/interfaces/user-interface"
import { AuthService } from "../AuthService"

export const userGetAction = async (username: string): Promise<UserResponseDto> => {
  const { data } = await AuthService.get(`/user/${username}`);
  return data;
}

export const artistGetAction = async (username: string): Promise<UserResponseDto> => {
  const { data } = await AuthService.get(`/artist/${username}`);
  return data;
}
