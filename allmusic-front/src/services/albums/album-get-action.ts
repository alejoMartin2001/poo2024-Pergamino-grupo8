import { AuthService } from "../AuthService"
import { Sections } from "src/interfaces/section-interface";



export const albumGetAction = async (): Promise<Sections[]> => {
  const { data } = await AuthService.get(`/albums/me`)
  return data;
}

export const albumGetAllAction = async (): Promise<Sections[]> => {
  const { data } = await AuthService.get(`/albums`)
  return data;
}