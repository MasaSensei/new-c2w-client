import { Layouts } from "~/components/layouts";
import TailoringInventoryPage from "~/components/pages/(TailoringInventory)/tailoring-inventory/tailoringInventory";
export default function TailoringInventory() {
  return (
    <Layouts.PrivateRoute>
      <TailoringInventoryPage />
    </Layouts.PrivateRoute>
  );
}
