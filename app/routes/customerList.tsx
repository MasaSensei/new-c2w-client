import { Layouts } from "~/components/layouts";
import type { Route } from "./+types/home";
import CustomerPage from "~/components/pages/customer/customer";

export default function CustomerList() {
  return (
    <Layouts.PrivateRoute>
      <CustomerPage />
    </Layouts.PrivateRoute>
  );
}
