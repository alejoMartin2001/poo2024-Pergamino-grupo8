
import { AuthService } from "../AuthService";
import { Sections } from "src/interfaces/section-interface";


export const getPlaylistsMeAction = async (): Promise<Sections[]> => {
  const { data } = await AuthService.get("/me/playlist");
  return data;
}

 