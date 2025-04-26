import type { PurchaseListDetail } from "./purchaseListDetail";
import type { Supplier } from "./supplier";
import type { Worker } from "./worker";

export type OutgoingRawMaterial = {
  id: number;
  date: string;
  rolls: number;
  yards: string;
  status: string;
  PurchaseListDetail?: PurchaseListDetail;
  Worker?: Worker;
  Supplier?: Supplier;
};

export type ApiResponse = {
  success: boolean;
  data: OutgoingRawMaterial[];
  message: string;
};
