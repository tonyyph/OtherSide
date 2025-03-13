import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserArticleStore {
  isArticled: boolean;
  setIsArticled: (isArticled: boolean) => void;
}

export const useUserArticleStore = create<UserArticleStore>()(
  persist(
    (set) => ({
      isArticled: false,
      setIsArticled: (isArticled) => set({ isArticled })
    }),
    {
      name: "user-article-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
