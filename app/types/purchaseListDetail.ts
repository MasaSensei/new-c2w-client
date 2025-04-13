import type { PurchaseList } from "./purchaseList";
import type { RawMaterial } from "./rawMaterial";

export type PurchaseListDetailReturn = {
  id: number;
  id_purchase_list_detail: number;
  date: string;
  jatuh_tempo: string;
  rolls: number;
  yards: string;
  PurchaseListDetail?: PurchaseListDetail;
  price_per_yard: string;
  total: string;
  remarks: string;
  is_active: boolean;
};

export type PurchaseListDetail = {
  id?: number;
  id_purchase_list?: number;
  PurchaseListDetailReturn?: PurchaseListDetailReturn[];
  id_purchase_list_detail?: number;
  purchase_list?: PurchaseList[];
  PurchaseList?: PurchaseList;
  id_raw_material?: number;
  raw_material?: RawMaterial;
  material?: string;
  rolls: number;
  yards: number;
  yardsPerRoll?: number;
  price_per_yard: number;
  total: string;
  remarks?: string;
  is_active: boolean;
};

export type ApiResponse = {
  success: boolean;
  data: PurchaseListDetail[];
  message: string;
};
