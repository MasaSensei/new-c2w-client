import { Layouts } from "~/components/layouts";
import type { Route } from "../+types/home";
import StagingTailorInventoryPage from "~/components/pages/(CuttingInventory)/staging-tailor-inventory/stagingTailorInventory";

export default function StagingTailorInventory() {
  return (
    <Layouts.PrivateRoute>
      <StagingTailorInventoryPage />
    </Layouts.PrivateRoute>
  );
}
