import { useFavoritesStore } from "@/store/favorites.store";
import { usePlayerStore } from "@/store/player.store";
import { Button } from "@/components/ui/button";
import { Music2Icon, Trash2Icon } from "lucide-react";

const FavoritesPage = () => {
  const { favorites,removeFavorite } = useFavoritesStore();
  const {setPlayedSong}=usePlayerStore();
  return (
    <div className="">
      <div className="container mx-auto max-h-[80vh] mt-40 overflow-y-auto px-5 flex flex-col items-center gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
        {favorites?.map((song) => {
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
                    Play Song
                  </Button>
                  <Button
                    variant={"destructive"}
                    onClick={() => removeFavorite(song.trackId)}
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

export default FavoritesPage;
