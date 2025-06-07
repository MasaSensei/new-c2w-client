import { create } from "zustand";

type TailoringInventory = {
  date: string;
  material: string;
  worker: string;
  pcs: string;
  size: string;
  yards: string;
};

type TailoringInventoryState = {
  tailoringInventory: TailoringInventory[];
  addTailoringInventory: (item: TailoringInventory) => void;
  updateTailoringInventory: (index: number, item: TailoringInventory) => void;
  removeTailoringInventory: (index: number) => void;
  resetTailoringInventory: () => void;
};

export const useTailoringInventoryStore = create<TailoringInventoryState>()(
  (set) => ({
    tailoringInventory: [],
    addTailoringInventory: (item: TailoringInventory) =>
      set((state) => ({
        tailoringInventory: [...state.tailoringInventory, item],
      })),
    updateTailoringInventory: (index: number, item: TailoringInventory) =>
      set((state) => ({
        tailoringInventory: state.tailoringInventory.map((i, idx) =>
          idx === index ? item : i
        ),
      })),
    removeTailoringInventory: (index: number) =>
      set((state) => ({
        tailoringInventory: state.tailoringInventory.filter(
          (_, i) => i !== index
        ),
      })),
    resetTailoringInventory: () => set({ tailoringInventory: [] }),
  })
);
