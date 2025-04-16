import { create } from "zustand";

type MaterialItem = {
  id_staging_cutting_inventory: number;
  material?: string;
  rolls: number;
  yards: number | string;
};

interface CuttingProgressStore {
  invoice: string;
  date: string;
  id_worker: number;
  remarks: string;
  materials: MaterialItem[];

  setInvoice: (invoice: string) => void;
  setDate: (date: string) => void;
  setWorker: (id: number) => void;
  setRemarks: (remarks: string) => void;

  addMaterial: (item: MaterialItem) => void;
  updateMaterial: (index: number, item: Partial<MaterialItem>) => void;
  removeMaterial: (index: number) => void;

  reset: () => void;
}

export const useCuttingProgressStore = create<CuttingProgressStore>((set) => ({
  invoice: "",
  date: "",
  id_worker: 0,
  remarks: "",
  materials: [],

  setInvoice: (invoice) => set({ invoice }),
  setDate: (date) => set({ date }),
  setWorker: (id_worker) => set({ id_worker }),
  setRemarks: (remarks) => set({ remarks }),

  addMaterial: (item) => {
    console.log(item);
    set((state) => ({
      materials: [...state.materials, item],
    }));
  },

  updateMaterial: (index, item) =>
    set((state) => {
      const updated = [...state.materials];
      updated[index] = { ...updated[index], ...item };
      return { materials: updated };
    }),

  removeMaterial: (index) =>
    set((state) => {
      const updated = [...state.materials];
      updated.splice(index, 1);
      return { materials: updated };
    }),

  reset: () =>
    set({
      invoice: "",
      date: "",
      id_worker: 0,
      remarks: "",
      materials: [],
    }),
}));
