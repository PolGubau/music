import type { Playlist, Song } from "@/lib/data";
import { Pause, Play } from "./Player";
import { usePlayerStore } from "@/store/playerStore";

export function PlayButton({
  id,
  size = "small",
  songId,
}: Readonly<{
  id: string;
  size?: "small" | "large";
  songId?: number;
}>) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const {
          songs,
          playlist,
        }: {
          songs: Song[];
          playlist: Playlist;
        } = data;
        setIsPlaying(true);

        const songToPlay = songs.find((song) => song.id === songId) || songs[0];

        setCurrentMusic({ songs, playlist, song: songToPlay });
      });
  };

  const iconClassName = size === "small" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400"
    >
      {isPlayingPlaylist ? (
        <Pause className={iconClassName} />
      ) : (
        <Play className={iconClassName} />
      )}
    </button>
  );
}
