import { Layouts } from "~/components/layouts";
import PurchaseListDetailPage from "~/components/pages/purchase-list/detail";
export default function Size() {
  return (
    <Layouts.PrivateRoute>
      <PurchaseListDetailPage />
    </Layouts.PrivateRoute>
  );
}
