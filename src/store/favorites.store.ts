import type { SongType } from "@/constants/type";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type FavoritesStore = {
  favorites: SongType[];
  addFavorite: (song: SongType) => void;
  removeFavorite: (id: number) => void;
};

export const useFavoritesStore = create<FavoritesStore>()(
  immer(
    persist<FavoritesStore>(
      (set) => ({
        favorites: [],
        addFavorite: (song: SongType) => {
          toast.success(`${song.trackName} added to favorites`);
          set((state) => {
            state.favorites.push(song);
            return state;
          });
        },
        removeFavorite: (id) => {
          toast.success("Song removed from favorites");
          set((state) => {
            state.favorites = state.favorites.filter((f) => f.trackId !== id);
            return state;
          });
        },
      }),
      {
        name: "favorites",
      }
    )
  )
);
