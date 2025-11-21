import type { SongType } from "@/constants/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesStore = {
  favorites: SongType[];
  addFavorite: (song: SongType) => void;
  removeFavorite: (id: number) => void;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist<FavoritesStore>(
    (set) => ({
      favorites: [],
      addFavorite: (song: SongType) =>
        set((state) => ({
          favorites: [
            ...state.favorites,
            {
              ...song,
            },
          ],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.trackId !== id),
        })),
    }),
    {
      name: "favorites",
    }
  )
);
