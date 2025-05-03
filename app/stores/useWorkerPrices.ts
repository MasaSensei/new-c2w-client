import { create } from "zustand";

type WorkerPrices = {
  id: number;
  id_worker: number;
  id_material: number;
  price: number;
  remarks: string;
};

interface WorkerPricesStore {
  workerPrices: WorkerPrices[];
  setWorkerPrices: (workerPrices: WorkerPrices[]) => void;
  addWorkerPrices: (workerPrices: WorkerPrices) => void;
  updateWorkerPrices: (id: number, workerPrices: WorkerPrices) => void;
  deleteWorkerPrices: (id: number) => void;
  resetWorkerPrices: () => void;
}

export const useWorkerPricesStore = create<WorkerPricesStore>((set) => ({
  workerPrices: [],
  setWorkerPrices: (workerPrices: WorkerPrices[]) =>
    set({ workerPrices: workerPrices }),
  addWorkerPrices: (workerPrices: WorkerPrices) =>
    set((state) => ({
      workerPrices: [...state.workerPrices, workerPrices],
    })),
  updateWorkerPrices: (id: number, workerPrices: WorkerPrices) =>
    set((state) => ({
      workerPrices: state.workerPrices.map((workerPrice) =>
        workerPrice.id === id ? workerPrices : workerPrice
      ),
    })),
  deleteWorkerPrices: (id: number) =>
    set((state) => ({
      workerPrices: state.workerPrices.filter((_, index) => index !== id),
    })),
  resetWorkerPrices: () => set({ workerPrices: [] }),
}));
