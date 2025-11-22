import { Link, useParams } from "react-router";
import { usePlaylistsStore } from "@/store/playlists.store";
import { Heart, MoveLeftIcon, Music2Icon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/store/player.store";
import { useFavoritesStore } from "@/store/favorites.store";

const PlaylistIDPage = () => {
  const { id } = useParams();
  const { playlists } = usePlaylistsStore();
  const playlist = playlists.find((p) => p.id === id);
  const { setPlayedSong } = usePlayerStore();
  const { addFavorite, removeFavorite, favorites } = useFavoritesStore();
  const { removeSongFromPlaylist } = usePlaylistsStore();

  return (
    <div>
      <Link
        to="/playlists"
        className="absolute flex items-center gap-3 top-25 left-9 font-semibold underline underline-offset-6 text-primary"
        viewTransition
      >
        <MoveLeftIcon className="size-5" />
        Back to playlists
      </Link>
      <div className="container mx-auto max-h-[80vh] mt-40 overflow-y-auto px-5 flex flex-col items-center gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
        {playlist?.image && (
          <img
            src={playlist.image}
            alt={playlist.title}
            className="h-60 w-60 rounded-xl object-cover shadow-xl mb-4"
            style={{ viewTransitionName: `playlist-image-${id}` }}
          />
        )}
        {playlist?.songs.map((song) => {
          return (
            <>
              <div className="bg-background flex hover:bg-primary/5 transition-all justify-between items-center border w-full p-5 rounded-2xl">
                <div className="flex items-center gap-6">
                  <img
                    src={song.artworkUrl60}
                    alt={song.trackName}
                    className="rounded-full"
                  />
                  <div className="flex flex-col gap-1 hidden md:block">
                    <p className="font-semibold text-sm">{song.artistName}</p>
                    <p className="font-semibold text-lg">{song.trackName}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setPlayedSong(song);
                    }}
                  >
                    <Music2Icon />
                    <p className="hidden md:block">Play Song</p>
                  </Button>
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
                  <Button
                    variant={"destructive"}
                    onClick={() => removeSongFromPlaylist(id!, song.trackId)}
                  >
                    <Trash2Icon></Trash2Icon>
                  </Button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistIDPage;
