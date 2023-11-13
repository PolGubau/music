import type { Playlist, Song } from "@/lib/data";
import { Pause, Play } from "./Icons";
import { usePlayerStore } from "@/store/playerStore";
export function PlayButtonSong({
  id,
  songId,
}: Readonly<{
  id: string;
  songId?: number;
}>) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingSong = isPlaying && currentMusic?.song?.id === songId;

  const handleClick = () => {
    if (isPlayingSong) {
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

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-2 hover:scale-105 transition hover:bg-green-400"
    >
      {isPlayingSong ? <Pause /> : <Play />}
    </button>
  );
}
