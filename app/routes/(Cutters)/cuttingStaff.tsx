import type { Route } from "../+types/home";
import CuttingStaffPage from "~/components/pages/(Cutters)/cutting-staff/cuttingStaff";
import { Layouts } from "~/components/layouts";

export default function CuttingStaff() {
  return (
    <Layouts.PrivateRoute>
      <CuttingStaffPage />
    </Layouts.PrivateRoute>
  );
}
