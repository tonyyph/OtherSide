import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserExploreStore {
  isUpdateCategory: boolean;
  setIsUpdateCategory: (isUpdateCategory: boolean) => void;
}

export const useUserExploreStore = create<UserExploreStore>()(
  persist(
    (set) => ({
      isUpdateCategory: false,
      setIsUpdateCategory: (isUpdateCategory) => set({ isUpdateCategory })
    }),
    {
      name: "user-explore-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
