import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserGuidingStore {
  isFirstTimeSignUp: boolean;
  setIsFirstTimeSignUp: (isFirstTimeSignUp: boolean) => void;
  step: number;
  setStep: (step: number) => void;
  _reset: () => void;
}

export const useUserAGuidingStore = create<UserGuidingStore>()(
  persist(
    (set) => ({
      isFirstTimeSignUp: true,
      setIsFirstTimeSignUp: (isFirstTimeSignUp: boolean) =>
        set({ isFirstTimeSignUp }),
      step: 0,
      setStep: (step: number) => {
        set({ step });
      },
      _reset() {
        set({
          isFirstTimeSignUp: true,
          step: 0
        });
      }
    }),
    {
      name: "user-guiding-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
