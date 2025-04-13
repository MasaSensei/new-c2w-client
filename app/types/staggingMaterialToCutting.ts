import type { PurchaseListDetail } from "./purchaseListDetail";

export type StaggingMaterialToCutting = {
  id?: number;
  input_date: string;
  id_purchase_list_detail: number;
  rolls?: number;
  yards?: number;
  status?: string;
  remarks?: string;
  is_active?: boolean;
  PurchaseListDetail?: PurchaseListDetail;
};

export type ApiResponse = {
  success: boolean;
  data: StaggingMaterialToCutting[];
  message: string;
};
