import MainPage from "./pages/MainPage";
import { Routes, Route } from "react-router";
import PlaylistsPage from "./pages/PlaylistsPage";
import PlaylistIDPage from "./pages/PlaylistIDPage";
import FavoritesPage from "./pages/FavoritesPage";
import { usePlayerStore } from "./store/player.store";
import SongBar from "./components/SongBar";

const App = () => {
  const { playedSong } = usePlayerStore();
  return (
    <>
      {" "}
      {playedSong && <SongBar song={playedSong} />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/playlists" element={<PlaylistsPage />} />
        <Route path="/playlists/:id" element={<PlaylistIDPage />}></Route>
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
};

export default App;
