import type { Category } from "./category";

export type WorkerType = {
  id?: number;
  type: string;
  remarks: string;
  is_active?: boolean;
};

export type WorkerPrice = {
  Category?: Category;
  price: number;
};

export type Worker = {
  id?: number;
  name: string;
  number: string;
  worker_type_name?: string;
  WorkerDetail?: WorkerDetail[];
  address: string;
  remarks: string;
  minimum_cost?: number;
  is_active?: boolean;
};

export type WorkerDetail = {
  id?: number;
  id_worker: number;
  Worker?: Worker;
  id_worker_type: number;
  WorkerType?: WorkerType;
  WorkerPrice?: WorkerPrice[];
  minimum_cost: number;
  remarks?: string;
  is_active?: boolean;
};

export type ApiResponse = {
  success: boolean;
  data: Worker[];
  message: string;
};
