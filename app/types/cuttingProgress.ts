import type { Worker } from "./worker";

export type Material = {
  id_purchase_list_detail: number;
  id_staging_cutting_inventory: number;
  materials: string;
  material?: string;
  rolls: number;
  yards: number | string;
  is_active: boolean;
  status?: string;
};

export type CuttingProgress = {
  date: string;
  id_worker: number;
  Worker: Worker;
  invoice: string;
  remarks: string;
  CuttingProgressMaterial: Material[];
  materials: Material[];
};

export type ApiResponse = {
  success: boolean;
  data: CuttingProgress[];
  message: string;
};
