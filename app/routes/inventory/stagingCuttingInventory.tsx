import { Layouts } from "~/components/layouts";
import StagingCuttingInventoryPage from "~/components/pages/(Inventory)/staging-cutting-inventory/stagingCuttingInventory";

export default function MaterialInventory() {
  return (
    <Layouts.PrivateRoute>
      <StagingCuttingInventoryPage />
    </Layouts.PrivateRoute>
  );
}
