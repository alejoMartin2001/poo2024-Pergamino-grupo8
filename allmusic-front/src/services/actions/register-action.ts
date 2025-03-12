import { AuthService } from "../AuthService";

export const registerEnthAction = async (enthusiast: FormData) => {
  const { data } = await AuthService.post("/enth", enthusiast, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
}

export const registerArtistAction = async (artist: FormData) => {
  const { data } = await AuthService.post("/artist", artist, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
} 