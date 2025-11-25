import LazyImage from "./LazyImage";
import { ListPlus, Heart, Play } from "lucide-react";
import { Button } from "./ui/button";
import { useFavoritesStore } from "@/store/favorites.store";
import type { SongType } from "@/constants/type";
import type { Dispatch, SetStateAction } from "react";
import { usePlayerStore } from "@/store/player.store";
const SongCard = ({
  song,
  setAddSongDialog,
  setSelectedSong,
}: {
  song: SongType;
  setAddSongDialog: Dispatch<SetStateAction<boolean>>;
  setSelectedSong: Dispatch<SetStateAction<SongType | null>>;
}) => {
  const { addFavorite, favorites, removeFavorite } = useFavoritesStore();
  const { setPlayedSong } = usePlayerStore();
  return (
    <div className="flex justify-between items-center">
      {" "}
      <LazyImage
        src={song.artworkUrl60}
        alt={song.trackName}
        className="rounded-2xl hidden md:block"
      />{" "}
      <p className="text-sm md:text-lg font-semibold ml-3">{`${
        song.trackName.length > 10
          ? song.trackName.slice(0, 10) + "..."
          : song.trackName
      }`}</p>
      <div className="ml-auto flex gap-2">
        <Button
          className="bg-primary"
          size={"icon"}
          onClick={() => {
            setPlayedSong(song);
          }}
        >
          <Play />
        </Button>{" "}
        <Button
          className="bg-white"
          onClick={() => {
            setAddSongDialog(true);
            setSelectedSong(song);
          }}
        >
          {" "}
          <ListPlus />{" "}
        </Button>{" "}
        <Button
          variant={"ghost"}
          onClick={() => {
            if (favorites.some((f) => f.trackId === song.trackId))
              removeFavorite(song.trackId);
            else addFavorite(song);
          }}
        >
          {" "}
          <Heart
            className={`size-5 ${
              favorites.some((f) => f.trackId === song.trackId)
                ? "fill-primary text-primary"
                : ""
            } transition-all duration-300`}
          />{" "}
        </Button>{" "}
      </div>{" "}
    </div>
  );
};

export default SongCard;
