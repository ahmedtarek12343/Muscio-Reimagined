import { useGetSong } from "@/hooks/useFetchSong";
import type { SongType } from "@/constants/type";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { usePlaylistsStore } from "@/store/playlists.store";
import { Link } from "react-router";
import { Button } from "./ui/button";
import AnimatedList from "./AnimatedList";
import SongCard from "./SongCard";

const SongsDropdown = ({ debouncedSong }: { debouncedSong: string }) => {
  const {
    data: { results },
  } = useGetSong(debouncedSong);

  const { playlists, addSongToPlaylist } = usePlaylistsStore();
  const [addSongDialog, setAddSongDialog] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SongType | null>(null);
  return (
    <div className="absolute w-full">
      {debouncedSong && results.length === 0 ? (
        <p>No results Found</p>
      ) : (
        <div className="w-full">
          <AnimatedList
            items={results.map((song: SongType) => {
              return (
                <>
                  <SongCard
                    song={song}
                    setAddSongDialog={setAddSongDialog}
                    setSelectedSong={setSelectedSong}
                  />
                </>
              );
            })}
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={true}
          />
        </div>
      )}

      <Dialog open={addSongDialog} onOpenChange={setAddSongDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4 text-xl">
              Select a playlist to add your song
            </DialogTitle>
            <DialogDescription className="space-y-8">
              <div className="flex flex-col max-h-40 w-[80%] mx-auto overflow-auto gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {playlists.map((playlist) => (
                  <Button
                    className="bg-white"
                    onClick={() => {
                      setAddSongDialog(false);
                      addSongToPlaylist(playlist.id, selectedSong!);
                    }}
                  >
                    <p key={playlist.id}>{playlist.title}</p>
                  </Button>
                ))}
              </div>
              <div className="">
                {playlists.length === 0 && (
                  <p>
                    Seems like you dont have playlists :( <br />
                    <Link to="/playlists" className="text-primary">
                      Create one
                    </Link>{" "}
                  </p>
                )}
              </div>
              <div className="">
                {
                  <Button
                    onClick={() => {
                      setAddSongDialog(false);
                    }}
                  >
                    Close
                  </Button>
                }
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SongsDropdown;
