import { create } from "zustand";

type ReturnItem = {
  date: string;
  jatuh_tempo: string;
  total_roll: string;
  material: string;
  price_per_yard: string;
  length_in_yard: string;
  yard_per_roll?: string;
  sub_total: string;
  remarks: string;
};

interface ReturnStore {
  items: ReturnItem[];
  addItem: (item: ReturnItem) => void;
  updateItem: (index: number, item: ReturnItem) => void;
  removeItem: (index: number) => void;
  resetItems: () => void;
}

export const useDetailPurchaseStoreReturn = create<ReturnStore>((set) => ({
  items: [],
  addItem: (item) => {
    set((state) => ({
      items: [...state.items, item],
    }));
  },
  updateItem: (index, item) =>
    set((state) => ({
      items: state.items.map((i, idx) => (idx === index ? item : i)),
    })),
  removeItem: (index) =>
    set((state) => ({
      items: state.items.filter((_, idx) => idx !== index),
    })),
  resetItems: () => set({ items: [] }),
}));
