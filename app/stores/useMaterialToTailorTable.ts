import { create } from "zustand";

type MaterialToTailorTableStore = {
  date: string;
  material: string;
  pcs: string;
  size: string;
  yards: string;
};

interface MaterialToTailorTableStoreState {
  materialToTailorTable: MaterialToTailorTableStore[];
  setMaterialToTailorTable: (
    materialToTailorTable: MaterialToTailorTableStore[]
  ) => void;
  addMaterialToTailorTable: (
    materialToTailorTable: MaterialToTailorTableStore
  ) => void;
  updateMaterialToTailorTable: (
    index: number,
    materialToTailorTable: MaterialToTailorTableStore
  ) => void;
  removeMaterialToTailorTable: (id: number) => void;
  resetMaterialToTailorTable: () => void;
}

export const useMaterialToTailorTableStore =
  create<MaterialToTailorTableStoreState>((set) => ({
    materialToTailorTable: [],
    setMaterialToTailorTable: (materialToTailorTable) =>
      set({ materialToTailorTable }),
    addMaterialToTailorTable: (materialToTailorTable) =>
      set((state) => ({
        materialToTailorTable: [
          ...state.materialToTailorTable,
          materialToTailorTable,
        ],
      })),
    updateMaterialToTailorTable: (index, materialToTailorTable) =>
      set((state) => ({
        materialToTailorTable: state.materialToTailorTable.map((item, i) =>
          i === index ? materialToTailorTable : item
        ),
      })),
    removeMaterialToTailorTable: (id) =>
      set((state) => ({
        materialToTailorTable: state.materialToTailorTable.filter(
          (_, index) => index !== id
        ),
      })),
    resetMaterialToTailorTable: () => set({ materialToTailorTable: [] }),
  }));
