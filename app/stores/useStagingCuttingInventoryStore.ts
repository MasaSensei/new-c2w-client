import { create } from "zustand";

type StagingCuttingInventory = {
  date: string;
  material: string;
  rolls: string;
  yards: string;
  status: string;
  remarks?: string;
};

interface StagingCuttingInventoryStore {
  stagingCuttingInventory: StagingCuttingInventory[];
  setStagingCuttingInventory: (
    stagingCuttingInventory: StagingCuttingInventory[]
  ) => void;
  addStagingCuttingInventory: (
    stagingCuttingInventory: StagingCuttingInventory
  ) => void;
  updateStagingCuttingInventory: (
    id: number,
    stagingCuttingInventory: StagingCuttingInventory
  ) => void;
  deleteStagingCuttingInventory: (id: number) => void;
}

export const useStagingCuttingInventoryStore =
  create<StagingCuttingInventoryStore>((set) => ({
    stagingCuttingInventory: [],
    setStagingCuttingInventory: (stagingCuttingInventory) => {
      set({ stagingCuttingInventory });
    },
    addStagingCuttingInventory: (stagingCuttingInventory) => {
      set((state) => ({
        stagingCuttingInventory: [
          ...state.stagingCuttingInventory,
          stagingCuttingInventory,
        ],
      }));
      console.log(stagingCuttingInventory);
    },
    updateStagingCuttingInventory: (id, stagingCuttingInventory) => {
      set((state) => ({
        stagingCuttingInventory: state.stagingCuttingInventory.map(
          (item, index) => (index === id ? stagingCuttingInventory : item)
        ),
      }));
    },
    deleteStagingCuttingInventory: (id) => {
      set((state) => ({
        stagingCuttingInventory: state.stagingCuttingInventory.filter(
          (_, index) => index !== id
        ),
      }));
    },
  }));
