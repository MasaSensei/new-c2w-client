import { Layouts } from "~/components/layouts";
import type { Route } from "./+types/home";
import SupplierPage from "~/components/pages/(MasterData)/supplier/supplier";

export default function Supplier() {
  return (
    <Layouts.PrivateRoute>
      <SupplierPage />
    </Layouts.PrivateRoute>
  );
}
