import { AuthService } from "../AuthService";

export const registerEnthAction = async (enthusiast: FormData) => {
  const { data } = await AuthService.post("/enth", enthusiast);
  return data;
}

export const registerArtistAction = async (artist: FormData) => {
  const { data } = await AuthService.post("/artist", artist);
  return data;
} 