import { Layouts } from "~/components/layouts";
import MaterialInventoryPage from "~/components/pages/(Inventory)/material-inventory/materialInventory";

export default function MaterialInventory() {
  return (
    <Layouts.PrivateRoute>
      <MaterialInventoryPage />
    </Layouts.PrivateRoute>
  );
}
