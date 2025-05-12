import { create } from "zustand";

type CuttingInventory = {
  date: string;
  material: string;
  worker: string;
  rolls: string;
  yard: string;
};

interface CuttingInventoryStore {
  cuttingInventory: CuttingInventory[];
  setCuttingInventory: (cuttingInventory: CuttingInventory[]) => void;
  addCuttingInventory: (cuttingInventory: CuttingInventory) => void;
  updateCuttingInventory: (
    index: number,
    cuttingInventory: CuttingInventory
  ) => void;
  removeCuttingInventory: (index: number) => void;
  resetCuttingInventory: () => void;
}

export const useCuttingInventoryStore = create<CuttingInventoryStore>()(
  (set) => ({
    cuttingInventory: [],
    setCuttingInventory: (cuttingInventory) => set({ cuttingInventory }),
    addCuttingInventory: (cuttingInventory) =>
      set((state) => ({
        cuttingInventory: [...state.cuttingInventory, cuttingInventory],
      })),
    updateCuttingInventory: (index, cuttingInventory) =>
      set((state) => ({
        cuttingInventory: state.cuttingInventory.map((item, i) =>
          i === index ? cuttingInventory : item
        ),
      })),
    removeCuttingInventory: (index) =>
      set((state) => ({
        cuttingInventory: state.cuttingInventory.filter((_, i) => i !== index),
      })),
    resetCuttingInventory: () => set({ cuttingInventory: [] }),
  })
);
