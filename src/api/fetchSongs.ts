import { queryOptions } from "@tanstack/react-query";

export const fetchSongs = (query: string) => {
  return queryOptions({
    queryKey: ["songs", query],
    queryFn: async () => {
      const url = `https://itunes.apple.com/search?term=${query}&entity=song&limit=20&media=music`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });
};
