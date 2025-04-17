import { expoSecurePersistStorage } from "@/utils";
import isEqual from "react-fast-compare";
import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

interface UserStore {
  userProfile?: {
    email: string;
    firstName: string;
    gender: string;
    id: number;
    role: string;
    createdAt: string;
    updatedAt: string;
    language: string;
    birthday: string;
  };
}

const defaultValue: UserStore = {};

export const userStore = createWithEqualityFn<
  UserStore,
  [["zustand/persist", UserStore]]
>(
  persist(
    () => ({
      ...defaultValue
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => expoSecurePersistStorage)
    }
  ),
  isEqual
);
