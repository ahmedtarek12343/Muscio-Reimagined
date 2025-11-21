import { fetchSongs } from "@/api/fetchSongs";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetSong = (query: string) => {
  return useSuspenseQuery(fetchSongs(query));
};
