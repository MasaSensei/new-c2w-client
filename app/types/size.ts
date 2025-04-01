export type Size = {
  id?: number;
  size: string;
  remarks: string;
  is_active?: boolean;
};

export type ApiResponse = {
  success: boolean;
  data: Size[];
  message: string;
};
