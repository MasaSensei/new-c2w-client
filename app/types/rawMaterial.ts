import type { Code } from "./code";
import type { Color } from "./color";
import type { Item } from "./item";

export type RawMaterial = {
  id?: number;
  id_item: number;
  Item?: Item;
  id_color: number;
  Color1?: Color;
  id_color_2: number;
  Color2?: Color;
  id_code: number;
  Code?: Code;
  rolls?: number;
  yards?: number;
  remarks: string;
  is_active?: boolean;
};

export type ApiResponse = {
  success: boolean;
  data: RawMaterial[];
  message: string;
};
