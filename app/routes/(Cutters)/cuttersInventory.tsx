import { Layouts } from "~/components/layouts";
import type { Route } from "../+types/home";
import CuttingInventoryPage from "~/components/pages/(Cutters)/cutters-inventory/cuttersInventory";

export default function CuttersInventory() {
  return (
    <Layouts.PrivateRoute>
      <CuttingInventoryPage />
    </Layouts.PrivateRoute>
  );
}
