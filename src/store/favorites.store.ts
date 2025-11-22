import type { SongType } from "@/constants/type";
import { toast } from "sonner";
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
      addFavorite: (song: SongType) =>{
        toast.success(`${song.trackName} added to favorites`); 
        set((state) => ({
          favorites: [
            ...state.favorites,
            {
              ...song,
            },
          ],
        }))
      },
      removeFavorite: (id) =>{
        toast.success("Song removed from favorites"); 
        set((state) => ({
          favorites: state.favorites.filter((f) => f.trackId !== id),
        }))
      },
    }),
    {
      name: "favorites",
    }
  )
);
