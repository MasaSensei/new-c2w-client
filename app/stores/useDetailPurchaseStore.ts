import { create } from "zustand";

type RollItem = {
  total_roll: string;
  length_in_yard: string;
};

type PurchaseItem = {
  total_roll: string;
  date?: Date;
  supplier?: string;
  invoice?: string;
  material: string;
  color: string;
  item: string;
  price_per_yard: string;
  length_in_yard: string;
  yard_per_roll: string;
  sub_total: string;
  remarks?: string;
  rollItems?: RollItem[];
};

interface PurchaseStore {
  items: PurchaseItem[];
  addItem: (item: PurchaseItem) => void;
  removeItem: (index: number) => void;
  resetItems: () => void;
  updateItem: (index: number, item: PurchaseItem) => void;
}

export const usePurchaseStore = create<PurchaseStore>((set) => ({
  items: [],
  addItem: (newItem) =>
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.item === newItem.item &&
          item.color === newItem.color &&
          item.price_per_yard === newItem.price_per_yard
      );

      if (existingIndex !== -1) {
        const existing = state.items[existingIndex];

        // Pastikan roll sebelumnya tetap disimpan
        const previousRollItems: RollItem[] = existing.rollItems?.length
          ? existing.rollItems
          : existing.total_roll && existing.length_in_yard
          ? [
              {
                total_roll: existing.total_roll,
                length_in_yard: existing.length_in_yard,
              },
            ]
          : [];

        const updatedRollItems: RollItem[] = [
          ...previousRollItems,
          ...(newItem.rollItems?.length
            ? newItem.rollItems
            : [
                {
                  total_roll: newItem.total_roll,
                  length_in_yard: newItem.length_in_yard,
                },
              ]),
        ];

        const updatedTotalRoll = updatedRollItems.reduce(
          (sum, c) => sum + parseFloat(c.total_roll || "0"),
          0
        );

        const updatedTotalYard = updatedRollItems.reduce(
          (sum, c) =>
            sum +
            parseFloat(c.total_roll || "0") *
              parseFloat(c.length_in_yard || "0"),
          0
        );

        const price = parseFloat(newItem.price_per_yard || "0");
        const updatedSubTotal = price * updatedTotalYard;

        const updatedItem: PurchaseItem = {
          ...existing,
          total_roll: updatedTotalRoll.toString(),
          yard_per_roll: updatedTotalYard.toString(),
          sub_total: updatedSubTotal.toString(),
          rollItems: updatedRollItems,
        };

        const updatedItems = [...state.items];
        updatedItems[existingIndex] = updatedItem;

        return { items: updatedItems };
      }

      // Kalau material BELUM ADA, maka add baru dengan 1 roll item
      const newWithChildren: PurchaseItem = {
        ...newItem,
        rollItems: newItem.rollItems?.length
          ? newItem.rollItems
          : [
              {
                total_roll: newItem.total_roll,
                length_in_yard: newItem.length_in_yard,
              },
            ],
      };

      return { items: [...state.items, newWithChildren] };
    }),
  removeItem: (index) =>
    set((state) => ({ items: state.items.filter((_, i) => i !== index) })),
  resetItems: () => set({ items: [] }),
  updateItem: (index, item) =>
    set((state) => ({
      items: state.items.map((i, iIndex) => (iIndex === index ? item : i)),
    })),
}));
