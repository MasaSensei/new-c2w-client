import type { Worker } from "./worker";

export type Material = {
  id_purchase_list_detail: number;
  id_staging_cutting_inventory: number;
  materials: string;
  material?: string;
  rolls: number;
  rolls_used: number;
  yards: number | string;
  yards_used: number;
  is_active: boolean;
  status?: string;
};

export type CuttingProgress = {
  id?: number;
  date: string;
  end_date: string;
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
