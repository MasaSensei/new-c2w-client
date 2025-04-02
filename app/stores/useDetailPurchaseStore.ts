import { create } from "zustand";

type PurchaseItem = {
  total_roll: string;
  material: string;
  price_per_yard: string;
  length_in_yard: string;
  total_yard: string;
  sub_total: string;
  remarks?: string;
};

interface PurchaseStore {
  items: PurchaseItem[];
  addItem: (item: PurchaseItem) => void;
  removeItem: (index: number) => void;
  resetItems: () => void;
  updateItem: (index: number, item: PurchaseItem) => void;
}

export const usePurchaseStore = create<PurchaseStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (index) =>
    set((state) => ({ items: state.items.filter((_, i) => i !== index) })),
  resetItems: () => set({ items: [] }),
  updateItem: (index, item) =>
    set((state) => ({
      items: state.items.map((i, iIndex) => (iIndex === index ? item : i)),
    })),
}));
