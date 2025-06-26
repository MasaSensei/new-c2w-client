import { Layouts } from "~/components/layouts";
import GoodReceiverPage from "~/components/pages/(Procurement)/good-receiver/good-receiver";

export default function GoodReceiver() {
  return (
    <Layouts.PrivateRoute>
      <GoodReceiverPage />
    </Layouts.PrivateRoute>
  );
}
