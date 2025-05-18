import { Layouts } from "~/components/layouts";
import OutgoingTailoringHistoryPage from "~/components/pages/(TailoringInventory)/outgoing-tailoring-history/outgoingTailoringHistory";
export default function OutgoingTailoringHistory() {
  return (
    <Layouts.PrivateRoute>
      <OutgoingTailoringHistoryPage />
    </Layouts.PrivateRoute>
  );
}
