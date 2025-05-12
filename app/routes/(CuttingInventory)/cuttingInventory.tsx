import { Layouts } from "~/components/layouts";
import type { Route } from "../+types/home";
import CuttingInventoryPage from "~/components/pages/(CuttingInventory)/cutting-inventory/cuttingInventory";

export default function CuttingInventory() {
  return (
    <Layouts.PrivateRoute>
      <CuttingInventoryPage />
    </Layouts.PrivateRoute>
  );
}
