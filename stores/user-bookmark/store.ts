import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserSettingsStore {
  bookmarks: number[]; // Store bookmarked article IDs
  addBookmark: (id: number) => void;
  removeBookmark: (id: number) => void;
  removeAllBookmarks: () => void;
}

export const useUserBookmarkStore = create<UserSettingsStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (item: any) => {
        set((state) => ({
          bookmarks: state.bookmarks.includes(item)
            ? state.bookmarks
            : [...state.bookmarks, item]
        }));
      },

      removeBookmark: (id: number) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((item: any) => item?.id !== id)
        }));
      },
      removeAllBookmarks: () => {
        set((state) => ({
          bookmarks: []
        }));
      }
      //   removeBookmark: (id: number) => {
      //     set((state) => ({
      //       bookmarks: state.bookmarks.filter((bookmarkId) => bookmarkId !== id)
      //     }));
      //   }
    }),
    {
      name: "user-bookmark-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
