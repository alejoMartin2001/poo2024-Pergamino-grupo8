import { useQuery } from "@tanstack/react-query"
import { artistGetAction } from "src/services/users/user-get-action";

const time = 1000 * 60 * 60;

export const useArtistUsername = (username: string) => {

  const artistUsernameQuery = useQuery({
    queryKey: ["artist", username],
    queryFn: () => artistGetAction(username),
    staleTime: time
  });
  return {
    artistData: artistUsernameQuery.data,
    refetch: artistUsernameQuery.refetch
  }
}
