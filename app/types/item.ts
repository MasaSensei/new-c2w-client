export type Item = {
  id?: number;
  item: string;
  remarks: string;
  is_active?: boolean;
};

export type ApiResponse = {
  success: boolean;
  data: Item[];
  message: string;
};
