import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserAuthenticateStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  _reset: () => void;
}

export const useUserAuthenticateStore = create<UserAuthenticateStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      _reset() {
        set({
          isLoggedIn: false,
        });
      },
    }),
    {
      name: "user-authenticate-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
