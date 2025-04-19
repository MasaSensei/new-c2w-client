import { Layouts } from "~/components/layouts";
import type { Route } from "../+types/home";
import TailorStaffPage from "~/components/pages/(Tailors)/tailor-staff/tailorStaff";

export default function TailorStaff() {
  return (
    <Layouts.PrivateRoute>
      <TailorStaffPage />
    </Layouts.PrivateRoute>
  );
}
