import { expoSecurePersistStorage } from "@/utils";
import isEqual from "react-fast-compare";
import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

interface AuthenStore {
  cookie?: { accessToken: string; refreshToken: string };
}
const defaultValue: AuthenStore = {};

export const authenStore = createWithEqualityFn<
  AuthenStore,
  [["zustand/persist", AuthenStore]]
>(
  persist(
    () => ({
      ...defaultValue
    }),
    {
      name: "authen-storage",
      storage: createJSONStorage(() => expoSecurePersistStorage)
    }
  ),
  isEqual
);
