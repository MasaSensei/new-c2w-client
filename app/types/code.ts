export type Code = {
  id?: number;
  code: string;
  remarks: string;
  is_active?: boolean;
};

export type ApiResponse = {
  success: boolean;
  data: Code[];
  message: string;
};
