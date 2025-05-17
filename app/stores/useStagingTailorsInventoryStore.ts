import { create } from "zustand";

type StaggingTailorInventory = {
  date: string;
  material: string;
  rolls: string;
  yards: string;
  status: string;
  remarks?: string;
};

interface StaggingTailorInventoryStrore {
  stagingTailorInventory: StaggingTailorInventory[];
  setStagingTailorInventory: (
    stagingTailorInventory: StaggingTailorInventory[]
  ) => void;
  addStagingTailorInventory: (
    stagingTailorInventory: StaggingTailorInventory
  ) => void;
  updateStagingTailorInventory: (
    id: number,
    stagingTailorInventory: StaggingTailorInventory
  ) => void;
  deleteStagingTailorInventory: (id: number) => void;
  resetStagingTailorInventory: () => void;
}

export const useStaggingTailorInventoryStore =
  create<StaggingTailorInventoryStrore>((set) => ({
    stagingTailorInventory: [],
    setStagingTailorInventory: (stagingTailorInventory) =>
      set({ stagingTailorInventory }),
    addStagingTailorInventory: (stagingTailorInventory) => {
      set((state) => ({
        stagingTailorInventory: [
          ...state.stagingTailorInventory,
          stagingTailorInventory,
        ],
      }));
    },
    updateStagingTailorInventory: (id, stagingTailorInventory) =>
      set((state) => ({
        stagingTailorInventory: state.stagingTailorInventory.map(
          (item, index) => (index === id ? stagingTailorInventory : item)
        ),
      })),
    deleteStagingTailorInventory: (id) =>
      set((state) => ({
        stagingTailorInventory: state.stagingTailorInventory.filter(
          (_, index) => index !== id
        ),
      })),
    resetStagingTailorInventory: () => set({ stagingTailorInventory: [] }),
  }));
