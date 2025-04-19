import { Layouts } from "~/components/layouts";
import PurchaseListPage from "~/components/pages/purchase-list/purchaseList";

export default function Size() {
  return (
    <Layouts.PrivateRoute>
      <PurchaseListPage />
    </Layouts.PrivateRoute>
  );
}
