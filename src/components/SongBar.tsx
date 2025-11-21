import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  Shuffle,
  Repeat,
  X,
} from "lucide-react";
import type { SongType } from "@/constants/type";
import { Button } from "./ui/button";
import { usePlayerStore } from "@/store/player.store";

interface AudioPlayerBarProps {
  song: SongType;
}

const AudioPlayerBar = ({ song }: AudioPlayerBarProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const { playedSong, setPlayedSong } = usePlayerStore();

  const audioRef = useRef<HTMLAudioElement>(null);

  // Play new song immediately when song changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = song.previewUrl;
    audioRef.current.load();
    audioRef.current.volume = isMuted ? 0 : volume;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
    setCurrentTime(0);
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnd);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} preload="metadata" />
      <div className="fixed top-0 w-full z-50 pb-4 h-12 bg-gradient-to-r transition-all duration-300 from-background to-accent shadow-lg">
        <div className="container mx-auto px-4 pt-2">
          <div className="flex items-center justify-between gap-4">
            {/* Song info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {song.artworkUrl60 && (
                <img
                  src={song.artworkUrl60}
                  alt={song.trackName}
                  className="w-8 h-8 rounded object-cover"
                />
              )}
              <div className="min-w-0 flex-1 md:block hidden">
                <p className="text-sm font-medium truncate">{song.trackName}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {song.artistName}
                </p>
              </div>
            </div>

            {/* Main playback controls */}
            <div className="flex flex-col items-center gap-1 flex-1 max-w-md">
              <div className="flex items-center gap-3">
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Shuffle size={16} />
                </button>

                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <SkipBack size={18} />
                </button>

                <button onClick={togglePlay} className="text-primary ">
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>

                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <SkipForward size={18} />
                </button>

                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Repeat size={16} />
                </button>
              </div>
            </div>

            {/* Volume control */}
            <div className="items-center md:flex hidden gap-2 min-w-0 flex-1 justify-end">
              <button
                onClick={toggleMute}
                className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX size={16} />
                ) : (
                  <Volume2 size={16} />
                )}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                style={{
                  background:
                    "linear-gradient(to right, var(--primary), var(--primary))",
                  backgroundSize: `${volume * 100}% 100%`,
                  backgroundRepeat: "no-repeat",
                }}
                className="w-30 h-1 bg-muted rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary cursor-pointer"
              />
            </div>
            <Button
              variant="ghost"
              size="default"
              className="ml-10 text-primary"
              onClick={() => setPlayedSong(null)}
            >
              <X size={16} />
            </Button>
          </div>
        </div>{" "}
        <div className="flex items-center absolute -bottom-1 gap-2 w-full">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            style={{
              background:
                "linear-gradient(to right, var(--primary), var(--primary))",
              backgroundSize: `${(currentTime / duration) * 100}% 100%`,
              backgroundRepeat: "no-repeat",
            }}
            className="flex-1 h-1.5 bg-muted rounded-full appearance-none
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:h-0
    [&::-webkit-slider-thumb]:w-0
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-primary cursor-pointer"
          />
        </div>
      </div>{" "}
    </>
  );
};

export default AudioPlayerBar;
