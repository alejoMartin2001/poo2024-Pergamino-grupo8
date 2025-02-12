import { UserRequestDto, UserResponseDto } from "src/interfaces/user-interface";
import { AuthService } from "../AuthService";

export const registerEnthAction = async (enthusiast: UserRequestDto) => {
  const { data } = await AuthService.post("/enth", enthusiast);
  return data;
}

export const registerArtistAction = async (artist: UserResponseDto) => {
  const { data } = await AuthService.post("/artist", artist);
  return data;
} 