import { Layouts } from "~/components/layouts";
import OutgoingCuttingHistoryPage from "~/components/pages/(CuttingInventory)/outgoing-cutting-history/outgoingCuttingHistory";
export default function OutgoingCuttingHistory() {
  return (
    <Layouts.PrivateRoute>
      <OutgoingCuttingHistoryPage />
    </Layouts.PrivateRoute>
  );
}
