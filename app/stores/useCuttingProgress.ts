import { create } from "zustand";

type CuttingProgress = {
  id_purchase_list_detail: number;
  id_staging_cutting_inventory: number;
  material?: string;
  rolls: number;
  yards: number | string;
};

interface CuttingProgressStore {
  cuttingProgress: CuttingProgress[];
  setCuttingProgress: (cuttingProgress: CuttingProgress[]) => void;
  addCuttingProgress: (cuttingProgress: CuttingProgress) => void;
  updateCuttingProgress: (id: number, cuttingProgress: CuttingProgress) => void;
  deleteCuttingProgress: (id: number) => void;
  resetCuttingProgress: () => void;
}

export const useCuttingProgressStore = create<CuttingProgressStore>((set) => ({
  cuttingProgress: [],
  setCuttingProgress: (cuttingProgress) => set({ cuttingProgress }),
  addCuttingProgress: (cuttingProgress) => {
    set((state) => ({
      cuttingProgress: [...state.cuttingProgress, cuttingProgress],
    }));
    console.log(cuttingProgress);
  },

  updateCuttingProgress: (id, cuttingProgress) =>
    set((state) => ({
      cuttingProgress: state.cuttingProgress.map((item, index) =>
        index === id ? cuttingProgress : item
      ),
    })),
  deleteCuttingProgress: (id) =>
    set((state) => ({
      cuttingProgress: state.cuttingProgress.filter((_, index) => index !== id),
    })),
  resetCuttingProgress: () => set({ cuttingProgress: [] }),
}));
