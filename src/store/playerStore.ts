import type { Playlist, Song } from "@/lib/data";
import { create } from "zustand";
export interface IPlayerStore {
  isPlaying: boolean;
  currentMusic: {
    playlist: Playlist | null;
    song: Song | null;
    songs: Song[];
  };
  volume: number;
  setVolume: (volume: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentMusic: (currentMusic: {
    playlist: Playlist | null;
    song: Song | null;
    songs: Song[];
  }) => void;
}
export const usePlayerStore = create<IPlayerStore>((set) => ({
  isPlaying: false,
  currentMusic: { playlist: null, song: null, songs: [] },
  volume: 0.75,
  setVolume: (volume) => set({ volume }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
}));
