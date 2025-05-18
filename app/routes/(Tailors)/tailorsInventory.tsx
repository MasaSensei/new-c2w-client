import { Layouts } from "~/components/layouts";
import TailorsInventoryPage from "~/components/pages/(Tailors)/tailors-inventory/tailorsInventory";

export default function TailorsInventory() {
  return (
    <Layouts.PrivateRoute>
      <TailorsInventoryPage />
    </Layouts.PrivateRoute>
  );
}
