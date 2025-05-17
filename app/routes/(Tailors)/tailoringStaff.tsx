import { Layouts } from "~/components/layouts";
import type { Route } from "../+types/home";
import TailoringStaffPage from "~/components/pages/(Tailors)/tailoring-staff/tailoringStaff";

export default function TailorStaff() {
  return (
    <Layouts.PrivateRoute>
      <TailoringStaffPage />
    </Layouts.PrivateRoute>
  );
}
