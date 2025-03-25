import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserGuidingStore {
  isFirstTimeSignUp: boolean;
  setIsFirstTimeSignUp: (isFirstTimeSignUp: boolean) => void;
  isEnableStepOne: boolean;
  setIsEnableStepOne: (isEnableStepOne: boolean) => void;
  isEnableStepTwo: boolean;
  setIsEnableStepTwo: (isEnableStepTwo: boolean) => void;
  _reset: () => void;
}

export const useUserAGuidingStore = create<UserGuidingStore>()(
  persist(
    (set) => ({
      isFirstTimeSignUp: true,
      setIsFirstTimeSignUp: (isFirstTimeSignUp: boolean) =>
        set({ isFirstTimeSignUp }),
      isEnableStepOne: true,
      setIsEnableStepOne: (isEnableStepOne) => set({ isEnableStepOne }),
      isEnableStepTwo: false,
      setIsEnableStepTwo: (isEnableStepTwo) => set({ isEnableStepTwo }),
      _reset() {
        set({
          isFirstTimeSignUp: true,
          isEnableStepOne: true,
          isEnableStepTwo: false,
        });
      },
    }),
    {
      name: "user-guiding-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
