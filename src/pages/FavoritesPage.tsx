import React from "react";
import { useFavoritesStore } from "@/store/favorites.store";

const FavoritesPage = () => {
  const { favorites } = useFavoritesStore();
  return (
    <div>
      {favorites.map((song) => (
        <div className="flex justify-between items-center">
          <p>{song.trackName}</p>
          <img src={song.artworkUrl100} alt="" className="rounded-2xl" />
        </div>
      ))}
    </div>
  );
};

export default FavoritesPage;
