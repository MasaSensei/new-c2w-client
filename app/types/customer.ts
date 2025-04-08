export type Customer = {
  id?: number;
  name: string;
  number: string;
  address: string;
  remarks: string;
  is_active?: boolean;
};

export type ApiResponse = {
  success: boolean;
  data: Customer[];
  message: string;
};
