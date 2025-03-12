import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserProfileStore {
  isUpdateProfile: boolean;
  setIsUpdateProfile: (isUpdateProfile: boolean) => void;
}

export const useUserProfileStore = create<UserProfileStore>()(
  persist(
    (set) => ({
      isUpdateProfile: false,
      setIsUpdateProfile: (isUpdateProfile) => set({ isUpdateProfile })
    }),
    {
      name: "user-profile-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
