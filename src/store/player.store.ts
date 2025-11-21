import type { SongType } from "@/constants/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PlayerStore = {
  playedSong?: SongType | null;
  setPlayedSong: (song: SongType | null) => void;
};

export const usePlayerStore = create<PlayerStore>()(
  persist<PlayerStore>(
    (set) => ({
      playedSong: null,
      setPlayedSong: (song) => set({ playedSong: song }),
    }),
    {
      name: "player",
    }
  )
);
