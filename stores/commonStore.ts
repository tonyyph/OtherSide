import { create } from "zustand";
interface CommonStore {
  isLoading: boolean;
  networkName: string;
  isCommentEditorVisible?: boolean;
}

const defaultValue: CommonStore = {
  isLoading: false,
  networkName: ""
};

export const commonStore = create<CommonStore>(() => ({
  ...defaultValue
}));
