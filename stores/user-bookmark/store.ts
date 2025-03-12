import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserBookmarkStore {
  isBookmarked: boolean;
  setIsBookmarked: (isBookmarked: boolean) => void;
}

export const useUserBookmarkStore = create<UserBookmarkStore>()(
  persist(
    (set) => ({
      isBookmarked: false,
      setIsBookmarked: (isBookmarked) => set({ isBookmarked })
    }),
    {
      name: "user-bookmark-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
