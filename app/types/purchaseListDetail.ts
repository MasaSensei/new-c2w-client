import type { PurchaseList } from "./purchaseList";
import type { RawMaterial } from "./rawMaterial";

export type PurchaseListDetail = {
  id?: number;
  id_purchase_list: number;
  purchase_list?: PurchaseList[];
  id_raw_material: number;
  raw_material?: RawMaterial;
  material: string;
  rolls: number;
  yards: number;
  price_per_yard: string;
  total: string;
  remarks?: string;
  is_active: boolean;
};

export type ApiResponse = {
  success: boolean;
  data: PurchaseListDetail[];
  message: string;
};
