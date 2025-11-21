export interface SongType {
  trackId: number;
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  artworkUrl100: string;
  artworkUrl60: string;
  previewUrl: string;
  trackName: string;
  releaseDate: string;
}

export interface PlaylistType {
  id: string;
  title: string;
  image?: string;
  songs: SongType[];
}

export interface PlaylistStore {
  playlists: PlaylistType[];
  addPlaylist: (playlist: PlaylistType) => void;
  removePlaylist: (id: string) => void;
  updatePlaylist: (
    id: string,
    newData: { title: string; image?: string }
  ) => void;
  addSongToPlaylist: (playlistId: string, song: SongType) => void;
  removeSongFromPlaylist: (playlistId: string, songId: number) => void;
}
