import { Layouts } from "~/components/layouts";
import PurchaseListPage from "~/components/pages/(Procurement)/purchase-list/purchaseList";

export default function PurchaseList() {
  return (
    <Layouts.PrivateRoute>
      <PurchaseListPage />
    </Layouts.PrivateRoute>
  );
}
