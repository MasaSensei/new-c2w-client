import { create } from "zustand";

type MaterialToCuttingTable = {
  date: string;
  material: string;
  rolls: string;
  yard: string;
};

interface MaterialToCuttingTableStore {
  items: MaterialToCuttingTable[];
  addItem: (item: MaterialToCuttingTable) => void;
  updateItem: (index: number, item: MaterialToCuttingTable) => void;
  removeItem: (id: number) => void;
  resetItems: () => void;
}

export const useMaterialInventoryStore = create<MaterialToCuttingTableStore>(
  (set) => ({
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
    removeItem: (id) =>
      set((state) => ({
        items: state.items.filter((_, index) => index !== id),
      })),
    resetItems: () => set({ items: [] }),
  })
);
