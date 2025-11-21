import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlaylistStore, SongType } from "@/constants/type";
import { toast } from "sonner";

export const usePlaylistsStore = create<PlaylistStore>()(
  persist<PlaylistStore>(
    (set, get) => ({
      playlists: [],

      addPlaylist: (playlist) => {
        set((state) => ({
          playlists: [
            ...state.playlists,
            {
              id: playlist.id,
              title: playlist.title,
              image: playlist.image || "",
              songs: playlist.songs || [],
            },
          ],
        }));
      },

      removePlaylist: (id) => {
        set((state) => ({
          playlists: state.playlists.filter((playlist) => playlist.id !== id),
        }));
      },

      updatePlaylist: (
        id: string,
        newData: { title: string; image?: string }
      ) => {
        set((state) => ({
          playlists: state.playlists.map((playlist) =>
            playlist.id === id
              ? {
                  ...playlist,
                  title: newData.title,
                  ...(newData.image !== undefined && { image: newData.image }),
                }
              : playlist
          ),
        }));
      },

      addSongToPlaylist: (playlistId: string, song: SongType) => {
        const state = get().playlists;
        const playlist = state.find((p) => p.id === playlistId);

        if (!playlist) {
          toast.error("Playlist not found");
          return;
        }

        if (playlist.songs.some((s) => s.trackId === song.trackId)) {
          toast.error("Song already exists in playlist");
          return;
        }

        set((state) => ({
          playlists: state.playlists.map((p) =>
            p.id === playlistId ? { ...p, songs: [...p.songs, song] } : p
          ),
        }));

        toast.success(`Song added to ${playlist.title}`);
      },

      removeSongFromPlaylist: (playlistId: string, songId: number) => {
        set((state) => ({
          playlists: state.playlists.map((p) =>
            p.id === playlistId
              ? { ...p, songs: p.songs.filter((s) => s.trackId !== songId) }
              : p
          ),
        }));
      },
    }),
    {
      name: "playlists",
    }
  )
);
