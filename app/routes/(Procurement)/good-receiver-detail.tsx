import { Layouts } from "~/components/layouts";
import GoodReceiverDetailPage from "~/components/pages/(Procurement)/good-receiver/detail";

export default function GoodReceiverDetail() {
  return (
    <Layouts.PrivateRoute>
      <GoodReceiverDetailPage />
    </Layouts.PrivateRoute>
  );
}
