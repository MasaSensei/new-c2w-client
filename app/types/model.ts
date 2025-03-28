export type Model = {
  id?: number;
  model: string;
  remarks: string;
  is_active?: number;
};

export type ApiResponse = {
  success: boolean;
  data: Model[];
  message: string;
};
