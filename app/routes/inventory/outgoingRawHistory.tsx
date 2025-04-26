import { Layouts } from "~/components/layouts";
import OutgoingRawHistoryPage from "~/components/pages/(Inventory)/outgoing-raw-history/outgoingRawHistory";

export default function OutgoingRawHistory() {
  return (
    <Layouts.PrivateRoute>
      <OutgoingRawHistoryPage />
    </Layouts.PrivateRoute>
  );
}
