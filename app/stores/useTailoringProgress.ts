import { create } from "zustand";

type TailoringProgress = {
  id_cutting_inventory_detail: number;
  id_staging_tailor_inventory: number;
  material?: string;
  rolls: number;
  yards: number | string;
};

interface TailoringProgressStore {
  tailoringProgress: TailoringProgress[];
  setTailoringProgress: (tailoringProgress: TailoringProgress[]) => void;
  addTailoringProgress: (tailoringProgress: TailoringProgress) => void;
  updateTailoringProgress: (
    id: number,
    tailoringProgress: TailoringProgress
  ) => void;
  deleteTailoringProgress: (id: number) => void;
  resetTailoringProgress: () => void;
}

export const useTailoringProgressStore = create<TailoringProgressStore>(
  (set) => ({
    tailoringProgress: [],
    setTailoringProgress: (tailoringProgress) => set({ tailoringProgress }),
    addTailoringProgress: (tailoringProgress) =>
      set((state) => ({
        tailoringProgress: [...state.tailoringProgress, tailoringProgress],
      })),
    updateTailoringProgress: (id, tailoringProgress) =>
      set((state) => ({
        tailoringProgress: state.tailoringProgress.map((item, index) =>
          index === id ? tailoringProgress : item
        ),
      })),
    deleteTailoringProgress: (id) =>
      set((state) => ({
        tailoringProgress: state.tailoringProgress.filter(
          (_, index) => index !== id
        ),
      })),
    resetTailoringProgress: () => set({ tailoringProgress: [] }),
  })
);
