import type { PurchaseListDetail } from "./purchaseListDetail";
import type { Supplier } from "./supplier";

export type PurchaseList = {
  id: number;
  id_supplier: number;
  Supplier?: Supplier;
  PurchaseListDetail?: PurchaseListDetail[];
  tanggal: Date;
  invoice_number: string;
  jatuh_tempo: Date;
  status: string;
  nominal: number | string;
  payment: number | string;
  outstanding: number | string;
  return: boolean;
  remarks?: string | null;
  is_active: boolean;
};

export type ApiResponse = {
  success: boolean;
  data: PurchaseList[];
  message: string;
};
