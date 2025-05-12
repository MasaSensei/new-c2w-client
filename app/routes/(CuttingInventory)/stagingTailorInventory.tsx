import { Layouts } from "~/components/layouts";
import type { Route } from "../+types/home";
import StagingCuttingInventoryPage from "~/components/pages/(Inventory)/staging-cutting-inventory/stagingCuttingInventory";

export default function StagingTailorInventory() {
  return (
    <Layouts.PrivateRoute>
      <StagingCuttingInventoryPage />
    </Layouts.PrivateRoute>
  );
}
