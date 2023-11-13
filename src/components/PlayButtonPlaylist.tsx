import type { Playlist, Song } from "@/lib/data";
import { Pause, Play } from "./Icons";
import { usePlayerStore } from "@/store/playerStore";

export function PlayButtonPlaylist({
  id,
  size = "small",
}: Readonly<{
  id: string;
  size?: "small" | "large";
}>) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id === id;

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

        const randomSong = songs[Math.floor(Math.random() * songs.length)];

        const songToPlay = randomSong;

        setCurrentMusic({ songs, playlist, song: songToPlay });
      });
  };

  const iconClassName = size === "small" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400 flex gap-2 text-black items-center"
    >
      Play Random song
      {isPlayingPlaylist ? (
        <Pause className={iconClassName} />
      ) : (
        <Play className={iconClassName} />
      )}
    </button>
  );
}
