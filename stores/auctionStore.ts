import { create } from "zustand";

interface AuctionStateStore {
  auctionData: any[];
  setAuctionData: (val: any[]) => void;
  clearAuctionData: () => void;
}

const defaultValue: AuctionStateStore = {
  auctionData: [],
  setAuctionData: () => {},
  clearAuctionData: () => {}
};

export const useAuctionStore = create<AuctionStateStore>((set) => ({
  ...defaultValue,
  setAuctionData: (val: any[]) => set({ auctionData: val }),
  clearUnreadCount: () => set({ auctionData: [] })
}));
