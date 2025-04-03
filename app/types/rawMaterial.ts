export type RawMaterial = {
  id?: number;
  size: string;
  remarks: string;
  is_active?: boolean;
};

export type ApiResponse = {
  success: boolean;
  data: RawMaterial[];
  message: string;
};
