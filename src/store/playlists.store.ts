import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlaylistStore, SongType } from "@/constants/type";
import { toast } from "sonner";
import { immer } from "zustand/middleware/immer";

export const usePlaylistsStore = create<PlaylistStore>()(
  immer(
    persist<PlaylistStore>(
      (set, get) => ({
        playlists: [],

        addPlaylist: (playlist) => {
          set((state) => {
            state.playlists.push(playlist);
            return state;
          });
        },

        removePlaylist: (id) => {
          set((state) => {
            state.playlists = state.playlists.filter(
              (playlist) => playlist.id !== id
            );
            return state;
          });
        },

        updatePlaylist: (
          id: string,
          newData: { title: string; image?: string }
        ) => {
          set((state) => {
            const playlist = state.playlists.find((p) => p.id === id);
            if (playlist) {
              playlist.title = newData.title;
              if (newData.image) {
                playlist.image = newData.image;
              }
            }
            return state;
          });
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

          set((state) => {
            playlist.songs.push(song);
            return state;
          });

          toast.success(`Song added to ${playlist.title}`);
        },

        removeSongFromPlaylist: (playlistId: string, songId: number) => {
          set((state) => {
            const playlist = state.playlists.find((p) => p.id === playlistId);
            if (playlist) {
              playlist.songs = playlist.songs.filter(
                (song) => song.trackId !== songId
              );
            }
            return state;
          });
        },
      }),
      {
        name: "playlists",
      }
    )
  )
);
